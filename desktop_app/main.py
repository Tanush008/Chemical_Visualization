from PyQt5.QtWidgets import *
import requests
import matplotlib.pyplot as plt


class App(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Chemical Equipment Visualizer")
        self.resize(500, 400)

        self.btn = QPushButton("Upload CSV")
        self.btn.clicked.connect(self.upload_csv)

        self.text = QTextEdit()
        self.text.setReadOnly(True)

        layout = QVBoxLayout()
        layout.addWidget(self.btn)
        layout.addWidget(self.text)
        self.setLayout(layout)

    def upload_csv(self):
        path, _ = QFileDialog.getOpenFileName(self, "Select CSV", "", "CSV Files (*.csv)")
        if not path:
            return

        files = {'file': open(path, 'rb')}
        response = requests.post(
            "http://127.0.0.1:8000/api/upload/",
            files=files
        )

        data = response.json()
        self.text.setText(str(data))

        self.plot_chart(data["equipment_type_distribution"])

        
    def plot_chart(self, dist):
        types = list(dist.keys())
        counts = list(dist.values())

        plt.figure()
        plt.bar(types, counts)
        plt.xlabel("Equipment Type")
        plt.ylabel("Count")
        plt.title("Equipment Type Distribution")
        plt.show()
app = QApplication([])
window = App()
window.show()
app.exec_()
