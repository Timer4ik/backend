const db = require("../../db.js")
const { DataTypes } = require("sequelize")

const Category = db.define("category", {
    category_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    file_id: { type: DataTypes.INTEGER, allowNull: true },
    parent_id: { type: DataTypes.INTEGER },
    desc: { type: DataTypes.TEXT, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_end: { type: DataTypes.BOOLEAN, defaultValue: false }
})

Category.hasMany(Category, {
    foreignKey: "parent_id",
    as: "categories"
});
Category.belongsTo(Category, {
    foreignKey: "parent_id",
    as: 'parent'
});


const Product = db.define("product", {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    descr: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, defaultValue: 0 },
    file_id: { type: DataTypes.INTEGER, allowNull: true },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    developer_id: { type: DataTypes.INTEGER, allowNull: false }
})

// Типы характеристик
const PropertyValue = db.define("property_value", {
    property_value_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    property_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Property = db.define("property", {
    property_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const CategoryProperty = db.define("category_property", {
    category_property_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    property_id: { type: DataTypes.INTEGER, allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    is_filter: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

Category.hasMany(CategoryProperty, { foreignKey: "category_id" })
CategoryProperty.belongsTo(Category, { foreignKey: "category_id" })

Property.hasMany(CategoryProperty, { foreignKey: "property_id" })
CategoryProperty.belongsTo(Property, { foreignKey: "property_id" })


const ProductPropertyValue = db.define("product_property_value", {
    product_property_value_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    property_value_id: { type: DataTypes.INTEGER, allowNull: true },
    category_property_id: { type: DataTypes.INTEGER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

Property.hasMany(PropertyValue, { foreignKey: "property_id" })
PropertyValue.belongsTo(PropertyValue, { foreignKey: "property_id" })

CategoryProperty.hasMany(ProductPropertyValue, { foreignKey: "category_property_id" })
ProductPropertyValue.belongsTo(CategoryProperty, { foreignKey: "category_property_id" })

PropertyValue.hasMany(ProductPropertyValue, { foreignKey: "property_value_id" })
ProductPropertyValue.belongsTo(PropertyValue, { foreignKey: "property_value_id" })

Product.hasMany(ProductPropertyValue, { foreignKey: "product_id" })
ProductPropertyValue.belongsTo(Product, { foreignKey: "product_id" })

Category.hasMany(Product, { foreignKey: "category_id" })
Product.belongsTo(Category, { foreignKey: "category_id" })

const User = db.define("user", {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    password: { type: DataTypes.STRING(100), allowNull: false },
    role: { type: DataTypes.STRING(20), defaultValue: "user" }
}, {
    timestamps: true
})

const PaymentMethod = db.define("payment_method", {
    payment_method_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})

const GetMethod = db.define("get_method", {
    get_method_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
})


const Order = db.define("order", {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER },
    status_id: { type: DataTypes.INTEGER, defaultValue: 0 },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
    payment_method_id: { type: DataTypes.INTEGER, allowNull: false },
    get_method_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true }
}, {
    timestamps: true
})
const OrderProduct = db.define("order_product", {
    order_product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    // reviewText:{type:DataTypes.TEXT,allowNull:true},
    // stars:{type:DataTypes.NUMBER,allowNull:true},
    amount: { type: DataTypes.INTEGER, defaultValue: 1 }
})

PaymentMethod.hasMany(Order, { foreignKey: "payment_method_id" })
Order.belongsTo(PaymentMethod, { foreignKey: "payment_method_id" })

GetMethod.hasMany(Order, { foreignKey: "get_method_id" })
Order.belongsTo(GetMethod, { foreignKey: "get_method_id" })

User.hasMany(Order, { foreignKey: "user_id" })
Order.belongsTo(User, { foreignKey: "user_id" })

Product.hasMany(OrderProduct, { foreignKey: "product_id" })
OrderProduct.belongsTo(Product, { foreignKey: "product_id" })

Order.hasMany(OrderProduct, { foreignKey: "order_id" })
OrderProduct.belongsTo(Order, { foreignKey: "order_id" })


const ProductPhoto = db.define("product_photo", {
    product_photo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    file_id: { type: DataTypes.INTEGER, allowNull: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
})

const Slider = db.define("slider", {
    slider_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING, },
    file_id: { type: DataTypes.INTEGER, allowNull: true },
    product_id: { type: DataTypes.INTEGER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    start_active_dt: { type: DataTypes.DATE, allowNull: true },
    end_active_dt: { type: DataTypes.DATE, allowNull: true }
})

Product.hasOne(Slider, { foreignKey: "product_id" })
Slider.belongsTo(Product, { foreignKey: "product_id" })

Product.hasMany(ProductPhoto, { foreignKey: "product_id" })
ProductPhoto.belongsTo(Product, { foreignKey: "product_id" })

const Promo = db.define("promo", {
    promo_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING },
    text: { type: DataTypes.TEXT }
})

const PromoProduct = db.define("promo_product", {
    promo_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
})

Promo.hasMany(PromoProduct, { foreignKey: "promo_id" })
PromoProduct.belongsTo(Promo, { foreignKey: "promo_id" })

Product.hasOne(PromoProduct, { foreignKey: "product_id" })
PromoProduct.belongsTo(Product, { foreignKey: "product_id" })

const ProductReview = db.define("product_review", {
    user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    comment: { type: DataTypes.TEXT },
    stars: { type: DataTypes.FLOAT, defaultValue: 0 }
})

Product.hasMany(ProductReview, { foreignKey: "product_id" })
ProductReview.belongsTo(Product, { foreignKey: "product_id" })

User.hasMany(ProductReview, { foreignKey: "user_id" })
ProductReview.belongsTo(User, { foreignKey: "user_id" })

const Developer = db.define("developer", {
    developer_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    file_id: { type: DataTypes.INTEGER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false }
})

Developer.hasMany(Product, { foreignKey: "developer_id" })
Product.belongsTo(Developer, { foreignKey: "developer_id" })

const File = db.define("file", {
    file_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.INTEGER, defaultValue: 0 },
    name: { type: DataTypes.STRING, allowNull: true },
    link: { type: DataTypes.STRING },
})

File.hasMany(Category, { foreignKey: "file_id" })
Category.belongsTo(File, { foreignKey: "file_id" })

File.hasMany(Developer, { foreignKey: "file_id" })
Developer.belongsTo(File, { foreignKey: "file_id" })

File.hasMany(Product, { foreignKey: "file_id" })
Product.belongsTo(File, { foreignKey: "file_id" })


File.hasMany(ProductPhoto, { foreignKey: "file_id" })
ProductPhoto.belongsTo(File, { foreignKey: "file_id" })

File.hasMany(Slider, { foreignKey: "file_id" })
Slider.belongsTo(File, { foreignKey: "file_id" })

const ShopProduct = db.define("shop_product", {
    shop_product: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    shop_id: { type: DataTypes.INTEGER, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_sold: { type: DataTypes.BOOLEAN, defaultValue: false },
})

const Shop = db.define("shop", {
    shop_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    file_id: { type: DataTypes.INTEGER, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: false },
    cords: { type: DataTypes.STRING, allowNull: false },
    openFrom: { type: DataTypes.STRING, allowNull: false },
    openTo: { type: DataTypes.STRING, allowNull: false },
    // is_active: { type: DataTypes.BOOLEAN, defaultValue: false },
})

Shop.hasMany(ShopProduct, { foreignKey: "shop_id" })
ShopProduct.belongsTo(Shop, { foreignKey: "shop_id" })

Product.hasMany(ShopProduct, { foreignKey: "product_id" })
ShopProduct.belongsTo(Product, { foreignKey: "product_id" })


File.hasMany(Shop, { foreignKey: "file_id" })
Shop.belongsTo(File, { foreignKey: "file_id" })
const Enums = {
    "category": Category,
    "categories": Category,
    "category_property": CategoryProperty,
    "category_properties": CategoryProperty,
    "user": User,
    "users": User,
    "photo": File,
    "photos": File,
    "file": File,
    "files": File,
    "order": Order,
    "payment_method": PaymentMethod,
    "payment_methods": PaymentMethod,
    "get_method": GetMethod,
    "get_methods": GetMethod,
    "orders": Order,
    "order_product": OrderProduct,
    "order_products": OrderProduct,
    "product": Product,
    "products": Product,
    "product_photo": ProductPhoto,
    "product_photos": ProductPhoto,
    "sliders": Slider,
    "slider": Slider,
    "promos": Promo,
    "promo": Promo,
    "promo_products": PromoProduct,
    "promo_product": PromoProduct,

    "property_value": PropertyValue,
    "property_values": PropertyValue,

    "property": Property,
    "properties": Property,

    "product_property_value": ProductPropertyValue,
    "product_properties": ProductPropertyValue,

    "product_review": ProductReview,
    "product_reviews": ProductReview,

    "developers": Developer,
    "developer": Developer,
    "shop": Shop,
    "shops": Shop,
    "shop_product": ShopProduct,
    "shop_products": ShopProduct,
}

module.exports = {
    Enums,
    User,
    Order,
    OrderProduct,
    File,
    CategoryProperty,
    Category,
    Product,
    Developer,
    // SubCategory,
    ProductPhoto,
    Slider, Promo,
    PromoProduct,
    PropertyValue,
    Property,
    ProductPropertyValue,
    ProductReview,
    Shop,
    ShopProduct,
    PaymentMethod,
    GetMethod
}


