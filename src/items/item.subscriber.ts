import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Logger } from "@nestjs/common";
import { Item } from "./entities/item.entity";

@EventSubscriber()
export class ItemSubscriber implements EntitySubscriberInterface<Item> {
  private readonly logger = new Logger(ItemSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo(): Function | string {
    return Item;
  }

  beforeInsert(event: InsertEvent<Item>): Promise<any> | void {
    this.logger.log('beforeInsert', JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Item>): Promise<any> | void {
    this.logger.log('afterInsert',JSON.stringify(event.entity));
  }
}