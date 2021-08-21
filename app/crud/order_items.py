from sqlalchemy.orm import Session

from app.entities.models import OrderItem as dbOrderItem
from app.entities.schemas import OrderItemCreate


def get_by_id(db: Session, order_item_id: int):
    return db.query(dbOrderItem).filter(dbOrderItem.id == order_item_id).first()


def get_all(db: Session, skip: int = 0, limit: int = 100):
    return db.query(dbOrderItem).offset(skip).limit(limit).all()


def get_by_order_id(db: Session, order_id: int, skip: int = 0, limit: int = 100):
    return db.query(dbOrderItem).filter(dbOrderItem.order_id == order_id).offset(skip).limit(limit).all()


def create(db: Session, order_id: int, order_item: OrderItemCreate):
    instance = dbOrderItem(order_id=order_id, item_id=order_item.item_id, amount=order_item.amount,
                           notes=order_item.notes, combo=order_item.combo)
    db.add(instance)
    db.commit()
    db.refresh(instance)
    return instance


def delete_by_order_id(db: Session, order_id: int):
    rows: int = db.query(dbOrderItem).filter(dbOrderItem.order_id == order_id).delete()
    db.commit()
    return rows


def delete_by_id(db: Session, order_item_id: int):
    instance = get_by_id(db, order_item_id=order_item_id)
    if instance is None:
        return None

    db.delete(instance)
    db.commit()
    return instance
