from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.entities.schemas import Order, OrderCreate
from app.crud import orders

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
    dependencies=[Depends(get_db)],
    responses={404: {"description": "Not found"}},
)


@router.post("/", response_model=Order)
def create_order(order: OrderCreate,  db: Session = Depends(get_db)):
    return orders.create(db, order=order)


@router.get("/", response_model=List[Order])
def read_orders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return orders.get_all(db, skip=skip, limit=limit)


@router.get("/{order_id}", response_model=Order)
def read_order(order_id: int, db: Session = Depends(get_db)):
    instance = orders.get_by_id(db, order_id=order_id)
    if instance is None:
        raise HTTPException(status_code=404, detail="Order not found")

    return instance


@router.delete("/{order_id}", response_model=Order)
def read_order(order_id: int, db: Session = Depends(get_db)):
    instance = orders.delete_by_id(db, order_id=order_id)
    if instance is None:
        raise HTTPException(status_code=404, detail="Order not found")

    return instance
