from pathlib import Path
from datetime import datetime


INCIDENT_DIR = Path("data/incidents")

INCIDENT_DIR.mkdir(parents=True, exist_ok=True)


def save_report(report_text):
    incident_id = datetime.utcnow().strftime("INC-%Y%m%d-%H%M%S")

    filename = INCIDENT_DIR / f"{incident_id}.txt"

    with open(filename, "w") as f:
        f.write(report_text)

    return str(filename)
