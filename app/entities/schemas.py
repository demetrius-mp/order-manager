import datetime
from typing import List, Optional

from pydantic import BaseModel, Field


class ItemBase(BaseModel):
    name: str
    price: float
    price_combo: float


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True


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

    class Config:
        orm_mode = True


class OrderBase(BaseModel):
    customer: str
    created_at: datetime.datetime = Field(default_factory=datetime.datetime.now)
    done: bool = False


class OrderCreate(OrderBase):
    pass


class Order(OrderBase):
    id: int
    done_at: Optional[datetime.datetime] = None
    items: List[OrderItem] = []

    class Config:
        orm_mode = True
