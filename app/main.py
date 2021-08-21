from fastapi import FastAPI

from app.routers import items, orders, order_items
from app.entities.database import engine
from app.entities import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


app.include_router(orders.router)
app.include_router(items.router)
app.include_router(order_items.router)
