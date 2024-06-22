import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
	mysqlTable,
	int,
	varchar,
	timestamp,
	mysqlEnum,
	decimal,
	text,
	json
} from "drizzle-orm/mysql-core";

const Role = ["ADMIN", "USER"] as const;

export const UserTable = mysqlTable("users", {
	id: int("id").primaryKey().notNull().autoincrement(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	password: varchar("password", { length: 255 }).notNull(),
	role: mysqlEnum("role", Role).default("USER").notNull(),
    addresses: json("addresses").$type<number[]>().notNull().default([]),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TypeUser = InferSelectModel<typeof UserTable>;
export type TypeNewUser = InferInsertModel<typeof UserTable>;

export const ProductTable = mysqlTable("products", {
	id: int("id").primaryKey().notNull().autoincrement(),
	name: varchar("name", { length: 255 }).notNull(),
	description: text("description").notNull(),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	tags: varchar("tags", { length: 255 }).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type TypeProduct = InferSelectModel<typeof ProductTable>;
export type TypeNewProduct = InferInsertModel<typeof ProductTable>;

export const AddressTable = mysqlTable("addresses", {
	id: int("id").primaryKey().notNull().autoincrement(),
	lineOne: varchar("line_one", { length: 255 }).notNull(),
	lineTwo: varchar("line_two", { length: 255 }),
	city: varchar("city", { length: 255 }).notNull(),
	country: varchar("country", { length: 255 }).notNull(),
	pincode: varchar("pincode", { length: 255 }).notNull(),
    userId: int('user_id').notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("udated_at").defaultNow().notNull(),
});

export type TypeAddress = InferSelectModel<typeof AddressTable>;
export type TypeNewAddress = InferInsertModel<typeof AddressTable>;


// relations...

export const UserTableRelations = relations(UserTable, ({ many }) => {
    return {
        address: many(AddressTable)
    }
});

export const AdderssTableRelations = relations(AddressTable, ({ one }) => {
    return {
        user: one(UserTable, {
            fields: [AddressTable.userId],
            references: [UserTable.id]
        })
    }
})
