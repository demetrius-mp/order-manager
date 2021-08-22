from typing import Optional

from sqlalchemy.orm import Session

from app.entities.models import Order as dbOrder
from app.entities.schemas import OrderCreate


def get_by_id(db: Session, order_id: int):
    return db.query(dbOrder).filter(dbOrder.id == order_id).first()


def get_all(db: Session, skip: int = 0, limit: int = 100, done: Optional[bool] = None):
    if done is None:
        return db.query(dbOrder).offset(skip).limit(limit).all()

    return db.query(dbOrder).filter(dbOrder.done == done).offset(skip).limit(limit).all()


def create(db: Session, order: OrderCreate):
    instance = dbOrder(customer=order.customer)
    db.add(instance)
    db.commit()
    db.refresh(instance)
    return instance


def delete_by_id(db: Session, order_id: int):
    instance = get_by_id(db, order_id=order_id)
    if instance is None:
        return None

    db.delete(instance)
    db.commit()
    return instance
