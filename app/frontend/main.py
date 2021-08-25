from fastapi import Request, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

router = APIRouter()

router.mount("/static", StaticFiles(directory="app/frontend/static"), name="static")
templates = Jinja2Templates(directory="app/frontend/templates")


@router.get('/')
@router.get('/home')
def home(request: Request):
    return templates.TemplateResponse("home.html", {'request': request})


@router.get('/pedidos')
def pedidos(request: Request):
    return templates.TemplateResponse("pedidos.html", {'request': request})


@router.get('/admin')
def admin(request: Request):
    return templates.TemplateResponse("admin.html", {'request': request})
