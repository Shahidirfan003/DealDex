const items = [
    {
        image: "DealDex.png",
        title: "Modern Coffee Table",
        description: "Stylish coffee table with a glass top and wooden base. Like-new condition.",
        price: 120,
        category: "Furniture",
        location: "Midtown, Exampleville",
        status: "Available",
        Rating: 4.2,
        phone:8787865432
    },
    {
        image: "DealDex.png",
        title: "Gaming Laptop - ASUS ROG",
        description: "ASUS Republic of Gamers laptop with high-end specs. Great for gaming and productivity.",
        price: 1500,
        category: "Electronics",
        location: "Tech District, Exampleville",
        status: "Available",
        phone:8787865432,
        Rating: 4.9,
    },
    {
        image: "DealDex.png",
        title: "Vintage Vinyl Records",
        description: "Collection of classic vinyl records, including rock, jazz, and blues genres.",
        price: 250,
        category: "Collectibles & Art",
        location: "Artsy Quarter, Exampleville",
        status: "Available",
        phone:8787865432,
        Rating: 4.6,
    },
    {
        image: "DealDex.png",
        title: "Designer Handbag - Gucci",
        description: "Authentic Gucci handbag in excellent condition. Limited edition design.",
        price: 800,
        category: "Fashion & Beauty",
        location: "Fashion District, Exampleville",
        status: "Available",
        Rating: 4.7,
        phone:8787865432

    },
    {
        image: "DealDex.png",
        title: "Smart Home Security Camera",
        description: "Wireless security camera with motion detection and night vision capabilities.",
        price: 100,
        category: "Home & Garden",
        location: "Residential Area, Exampleville",
        status: "Available",
        Rating: 4.4,
        phone:8787865432

    },
    {
        image: "DealDex.png",
        title: "Professional DSLR Camera",
        description: "Canon EOS DSLR camera with multiple lenses and accessories. Perfect for photography enthusiasts.",
        price: 1200,
        category: "Electronics",
        location: "Photography District, Exampleville",
        status: "Available",
        Rating: 4.8,
        phone:8787865433
    },
    {
        image: "DealDex.png",
        title: "Antique Brass Telescope",
        description: "19th-century brass telescope with wooden stand. Great for collectors or decorative purposes.",
        price: 350,
        category: "Collectibles & Art",
        location: "Historical District, Exampleville",
        status: "Available",
        Rating: 4.3,
        phone:8787268432

    },
    {
        image: "DealDex.png",
        title: "Electric Scooter",
        description: "Foldable electric scooter with long battery life. Ideal for city commuting.",
        price: 300,
        category: "Sports & Outdoors",
        location: "Downtown, Exampleville",
        status: "Available",
        Rating: 4.5,
        phone:8787865432

    },
    {
        image: "DealDex.png",
        title: "Wooden Dining Table Set",
        description: "Solid wood dining table with matching chairs. Classic design, perfect for family meals.",
        price: 400,
        category: "Furniture",
        location: "Suburbs, Exampleville",
        status: "Available",
        Rating: 4.2,
        phone:8787865432

    },
    {
        image: "DealDex.png",
        title: "Fitness Tracker - Fitbit",
        description: "Fitbit fitness tracker with heart rate monitoring and activity tracking features.",
        price: 80,
        category: "Sports & Outdoors",
        location: "Fitness Center, Exampleville",
        status: "Available",
        Rating: 4.6,
        phone:8787865432

    }
];

for(let obj of items){
    obj.image={
        url: 'https://res.cloudinary.com/dq9wmikg9/image/upload/v1712648454/dealdex/yf8dctz9oe3nrdqcw2bz.jpg',
        filename: 'dealdex/yf8dctz9oe3nrdqcw2bz'
      }
}

module.exports=items;
