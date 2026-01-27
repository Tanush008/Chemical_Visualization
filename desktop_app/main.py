from PyQt5.QtWidgets import *
import requests
import matplotlib.pyplot as plt
import os


class App(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle("Chemical Equipment Visualizer")
        self.resize(600, 500)

        self.btn = QPushButton("Upload CSV")
        self.btn.clicked.connect(self.upload_csv)

        self.total_equipment_label = QLabel("Total Equipment: -")
        self.avg_flowrate_label = QLabel("Avg Flowrate: -")
        self.avg_pressure_label = QLabel("Avg Pressure: -")
        self.avg_temperature_label = QLabel("Avg Temperature: -")
        self.alerts_label = QLabel("Alerts: -")
        self.alerts_label.setWordWrap(True)

        self.text = QTextEdit()
        self.text.setReadOnly(True)

        # layout
        layout = QVBoxLayout()
        layout.addWidget(self.btn)
        layout.addWidget(self.total_equipment_label)
        layout.addWidget(self.avg_flowrate_label)
        # layout.addWidget(self.avg_pressure_label)
        layout.addWidget(self.avg_temperature_label)
        layout.addWidget(self.alerts_label)
        layout.addWidget(self.text)

        container = QWidget()
        
        container.setLayout(layout)
        
        self.setCentralWidget(container)
        

    def handle_existing_dataset(self, dataset_name):

        try:
            res = requests.get("http://127.0.0.1:8000/api/history/")
            history = res.json()

            dataset = next(
                (d for d in history if d["name"] == dataset_name),
                None
            )

            if not dataset:
                QMessageBox.warning(
                    self,
                    "Error",
                    "Dataset exists but could not be found in history."
                )
                return

            choice = QMessageBox.question(
                self,
                "Dataset Exists",
                f"The dataset '{dataset_name}' already exists.\n\n"
                "Do you want to view or delete it?",
                QMessageBox.Yes | QMessageBox.No | QMessageBox.Cancel,
                QMessageBox.Yes
            )

            if choice == QMessageBox.Yes:

                self.display_summary(dataset["summary"])
                self.plot_chart(
                    dataset["summary"]["equipment_type_distribution"]
                )

            elif choice == QMessageBox.No:

                requests.delete(
                    f"http://127.0.0.1:8000/api/delete/{dataset['id']}/"
                )
                QMessageBox.information(
                    self,
                    "Deleted",
                    "Dataset deleted successfully."
                )

        except Exception as e:
            QMessageBox.warning(self, "Error", str(e))

    def upload_csv(self):
        path, _ = QFileDialog.getOpenFileName(
            self, "Select CSV", "", "CSV Files (*.csv)")
        if not path:
            return

        file_name = os.path.basename(path)

        with open(path, 'rb') as file_obj:
            response = requests.post(
                "http://127.0.0.1:8000/api/upload/",
                files={'file': (file_name, file_obj)}
            )

        data = response.json()
        self.text.setText(str(data))

        if "equipment_type_distribution" not in data:
            message = data.get("message", "Upload error")
            if "already exists" in message.lower():
                self.handle_existing_dataset(file_name)
            else:
                QMessageBox.warning(self, "Upload Error", message)
            return

        return self.plot_chart(data["equipment_type_distribution"])

    def plot_chart(self, dist):
        types = list(dist.keys())
        counts = list(dist.values())

        plt.figure()
        plt.bar(types, counts)
        plt.xlabel("Equipment Type")
        plt.ylabel("Count")
        plt.title("Equipment Type Distribution")
        plt.show()

    def display_summary(self, summary):

        if not summary:
            return

        self.total_equipment_label.setText(
            f"Total Equipment: {summary.get('total_equipment', 'N/A')}"
        )

        self.avg_flowrate_label.setText(
            f"Avg Flowrate: {summary.get('avg_flowrate', 'N/A'):.2f}"
            if isinstance(summary.get("avg_flowrate"), (int, float))
            else "Avg Flowrate: N/A"
        )

        self.avg_pressure_label.setText(
            f"Avg Pressure: {summary.get('avg_pressure', 'N/A'):.2f}"
            if isinstance(summary.get("avg_pressure"), (int, float))
            else "Avg Pressure: N/A"
        )

        self.avg_temperature_label.setText(
            f"Avg Temperature: {summary.get('avg_temperature', 'N/A'):.2f}"
            if isinstance(summary.get("avg_temperature"), (int, float))
            else "Avg Temperature: N/A"
        )

        alerts = summary.get("alerts", [])
        if alerts:
            self.alerts_label.setText("⚠ Alerts:\n" + "\n".join(alerts))
        else:
            self.alerts_label.setText("No alerts detected")


app = QApplication([])
window = App()
window.show()
app.exec_()
