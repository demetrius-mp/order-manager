from fastapi import Request, APIRouter
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

router = APIRouter()

router.mount(
    "/static", StaticFiles(directory="app/frontend/static"), name="static")
templates = Jinja2Templates(directory="app/frontend/templates")


@router.get('/')
@router.get('/orders')
def orders(request: Request):
    return templates.TemplateResponse("orders.html", {'request': request})


@router.get('/items')
def items(request: Request):
    return templates.TemplateResponse("items.html", {'request': request})
