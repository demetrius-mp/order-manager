from fastapi import APIRouter

from backend.routers import items, orders, order_items
from backend.entities.database import engine, Base

Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="",
    responses={404: {"description": "Not found"}},
)

router.include_router(orders.router, prefix='/api/v1')
router.include_router(items.router, prefix='/api/v1')
router.include_router(order_items.router, prefix='/api/v1')
