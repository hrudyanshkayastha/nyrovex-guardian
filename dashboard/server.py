from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import FileResponse

import os

app = FastAPI()

app.mount(
    "/static",
    StaticFiles(directory="dashboard/static"),
    name="static"
)

templates = Jinja2Templates(
    directory="dashboard/templates"
)


@app.get("/")
async def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "critical_incidents": 3,
            "active_cases": 12,
            "threat_level": "HIGH",
            "confidence": 87,
        }
    )


@app.get("/download-report")
async def download_report():

    report_path = "data/incidents/demo_report.txt"

    if not os.path.exists(report_path):

        os.makedirs("data/incidents", exist_ok=True)

        with open(report_path, "w") as f:

            f.write("""
NYROVEX GUARDIAN INCIDENT REPORT

Incident:
Credential Dumping

Severity:
High

MITRE:
T1003 Credential Dumping

IOC:
185.199.110.153

Status:
Contained
""")

    return FileResponse(
        path=report_path,
        filename="INC-2026-001.txt",
        media_type="text/plain"
    )
