import { relations } from "drizzle-orm/relations";
import { products, subscriptions, users } from "./schema";

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	product: one(products, {
		fields: [subscriptions.productId],
		references: [products.id]
	}),
	user: one(users, {
		fields: [subscriptions.userId],
		references: [users.id]
	}),
}));

export const productsRelations = relations(products, ({many}) => ({
	subscriptions: many(subscriptions),
}));

export const usersRelations = relations(users, ({many}) => ({
	subscriptions: many(subscriptions),
}));