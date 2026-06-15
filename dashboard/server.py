from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

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

    data = {
        "request": request,
        "critical_incidents": 3,
        "active_cases": 12,
        "threat_level": "HIGH",
        "confidence": 87,
    }

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context=data
    )
