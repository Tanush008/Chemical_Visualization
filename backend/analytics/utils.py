import pandas as pd

def analyze_csv(file):
    df = pd.read_csv(file)

    summary = {
        "total_equipment": len(df),
        "avg_flowrate": float(df["Flowrate"].mean()),
        "avg_pressure": float(df["Pressure"].mean()),
        "avg_temperature": float(df["Temperature"].mean()),
        "equipment_type_distribution": df["Type"].value_counts().to_dict()
    }

    # 🔹 BASIC ANALYTICS INTELLIGENCE (ADD HERE)
    alerts = []

    if summary["avg_pressure"] > 80:
        alerts.append("High average pressure detected")

    if summary["avg_temperature"] > 150:
        alerts.append("High average temperature detected")

    summary["alerts"] = alerts

    return summary
