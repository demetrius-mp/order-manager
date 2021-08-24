from typing import Optional

from pydantic import BaseModel

from app.backend.entities.serializers.item import Item


class OrderItemBase(BaseModel):
    item_id: int
    amount: int
    notes: Optional[str] = None
    combo: Optional[bool] = False


class OrderItemCreate(OrderItemBase):
    pass


class OrderItem(OrderItemBase):
    id: int
    order_id: int
    item: Item

    class Config:
        orm_mode = True
