from fastapi import Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from starlette.applications import Starlette

router = Starlette()

router.mount("/static", StaticFiles(directory="frontend/static"), name="static")
templates = Jinja2Templates(directory="frontend/templates")


@router.route('/')
@router.route('/home')
def home(request: Request):
    return templates.TemplateResponse("home.html", {'request': request})


@router.route('/pedidos')
def pedidos(request: Request):
    return templates.TemplateResponse("pedidos.html", {'request': request})
