from fastapi import Request, FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

router = FastAPI()

router.mount("/static", StaticFiles(directory="frontend/static"), name="static")
templates = Jinja2Templates(directory="frontend/templates")


@router.get('/')
@router.get('/home')
def home(request: Request):
    return templates.TemplateResponse("home.html", {'request': request})


@router.get('/pedidos')
def pedidos(request: Request):
    return templates.TemplateResponse("pedidos.html", {'request': request})
