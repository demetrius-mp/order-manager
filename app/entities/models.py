from datetime import datetime

from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime, Float, Text
from sqlalchemy.orm import relationship

from .database import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer = Column(String)
    created_at = Column(DateTime, default=datetime.now)
    done_at = Column(DateTime, nullable=True)
    done = Column(Boolean, default=False)

    items = relationship("OrderItem", back_populates="order")


class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    item_id = Column(Integer, ForeignKey("items.id"))

    amount = Column(Integer)
    notes = Column(Text)
    combo = Column(Boolean, default=False)

    order = relationship("Order", back_populates="items")
    item = relationship("Item")


class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)
    price_combo = Column(Float)
