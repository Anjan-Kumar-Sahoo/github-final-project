import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice';
import './ProductList.css';

const plantsData = [
  // Air Purifying Plants
  {
    id: 1,
    name: 'Snake Plant',
    category: 'Air Purifying Plants',
    price: 15,
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb4?w=400',
    description: 'Excellent air purifier, low maintenance'
  },
  {
    id: 2,
    name: 'Spider Plant',
    category: 'Air Purifying Plants',
    price: 12,
    image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400',
    description: 'Great for removing toxins from air'
  },
  {
    id: 3,
    name: 'Peace Lily',
    category: 'Air Purifying Plants',
    price: 18,
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400',
    description: 'Beautiful white flowers, air purifying'
  },
  {
    id: 4,
    name: 'Boston Fern',
    category: 'Air Purifying Plants',
    price: 20,
    image: 'https://images.unsplash.com/photo-1585348631612-cd01a7cba5e0?w=400',
    description: 'Natural humidifier and air purifier'
  },
  {
    id: 5,
    name: 'Rubber Plant',
    category: 'Air Purifying Plants',
    price: 22,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    description: 'Large glossy leaves, excellent air cleaner'
  },
  {
    id: 6,
    name: 'Dracaena',
    category: 'Air Purifying Plants',
    price: 25,
    image: 'https://images.unsplash.com/photo-1598880940371-c756e015faf4?w=400',
    description: 'Easy care plant that removes toxins'
  },

  // Aromatic Fragrant Plants
  {
    id: 7,
    name: 'Lavender',
    category: 'Aromatic Fragrant Plants',
    price: 16,
    image: 'https://images.unsplash.com/photo-1611251180773-5b8e4d9626e6?w=400',
    description: 'Calming fragrance, beautiful purple flowers'
  },
  {
    id: 8,
    name: 'Jasmine',
    category: 'Aromatic Fragrant Plants',
    price: 19,
    image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400',
    description: 'Sweet fragrance, delicate white flowers'
  },
  {
    id: 9,
    name: 'Mint',
    category: 'Aromatic Fragrant Plants',
    price: 10,
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400',
    description: 'Fresh aroma, great for teas'
  },
  {
    id: 10,
    name: 'Rosemary',
    category: 'Aromatic Fragrant Plants',
    price: 14,
    image: 'https://images.unsplash.com/photo-1583543225767-58b7a84a5ba1?w=400',
    description: 'Aromatic herb, culinary and medicinal uses'
  },
  {
    id: 11,
    name: 'Gardenia',
    category: 'Aromatic Fragrant Plants',
    price: 24,
    image: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?w=400',
    description: 'Intensely fragrant white blooms'
  },
  {
    id: 12,
    name: 'Eucalyptus',
    category: 'Aromatic Fragrant Plants',
    price: 17,
    image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400',
    description: 'Refreshing scent, medicinal properties'
  },

  // Insect Repellent Plants
  {
    id: 13,
    name: 'Citronella',
    category: 'Insect Repellent Plants',
    price: 13,
    image: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=400',
    description: 'Natural mosquito repellent'
  },
  {
    id: 14,
    name: 'Basil',
    category: 'Insect Repellent Plants',
    price: 11,
    image: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400',
    description: 'Repels flies and mosquitoes'
  },
  {
    id: 15,
    name: 'Marigold',
    category: 'Insect Repellent Plants',
    price: 9,
    image: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?w=400',
    description: 'Bright flowers, deters many pests'
  },
  {
    id: 16,
    name: 'Lemongrass',
    category: 'Insect Repellent Plants',
    price: 12,
    image: 'https://images.unsplash.com/photo-1596040033229-a0b4b3b7e3f3?w=400',
    description: 'Contains citronella, repels mosquitoes'
  },
  {
    id: 17,
    name: 'Catnip',
    category: 'Insect Repellent Plants',
    price: 10,
    image: 'https://images.unsplash.com/photo-1574865229753-e1b5e1c9c8f1?w=400',
    description: 'Repels mosquitoes more than DEET'
  },
  {
    id: 18,
    name: 'Chrysanthemum',
    category: 'Insect Repellent Plants',
    price: 15,
    image: 'https://images.unsplash.com/photo-1595784043806-a3eb8c4d9e1f?w=400',
    description: 'Natural insecticide properties'
  },

  // Medicinal Plants
  {
    id: 19,
    name: 'Aloe Vera',
    category: 'Medicinal Plants',
    price: 14,
    image: 'https://images.unsplash.com/photo-1596548438137-d51ea5c83ca5?w=400',
    description: 'Healing gel for skin conditions'
  },
  {
    id: 20,
    name: 'Tulsi (Holy Basil)',
    category: 'Medicinal Plants',
    price: 13,
    image: 'https://images.unsplash.com/photo-1607318043080-e99ba0bf3d5f?w=400',
    description: 'Sacred plant with healing properties'
  },
  {
    id: 21,
    name: 'Peppermint',
    category: 'Medicinal Plants',
    price: 11,
    image: 'https://images.unsplash.com/photo-1619478701979-113faf0bb8b1?w=400',
    description: 'Digestive aid, soothing properties'
  },
  {
    id: 22,
    name: 'Chamomile',
    category: 'Medicinal Plants',
    price: 12,
    image: 'https://images.unsplash.com/photo-1561844326-b96ac1c9c3c6?w=400',
    description: 'Calming tea, anti-inflammatory'
  },
  {
    id: 23,
    name: 'Calendula',
    category: 'Medicinal Plants',
    price: 14,
    image: 'https://images.unsplash.com/photo-1597307983932-1f45d1f2f36c?w=400',
    description: 'Healing for wounds and skin'
  },
  {
    id: 24,
    name: 'Thyme',
    category: 'Medicinal Plants',
    price: 10,
    image: 'https://images.unsplash.com/photo-1560713781-d00f6c18f388?w=400',
    description: 'Antiseptic and respiratory aid'
  },

  // Low Maintenance Plants
  {
    id: 25,
    name: 'ZZ Plant',
    category: 'Low Maintenance Plants',
    price: 20,
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400',
    description: 'Thrives on neglect, very hardy'
  },
  {
    id: 26,
    name: 'Pothos',
    category: 'Low Maintenance Plants',
    price: 13,
    image: 'https://images.unsplash.com/photo-1614594895304-fe7116ac3b1a?w=400',
    description: 'Easy care, trailing vines'
  },
  {
    id: 27,
    name: 'Jade Plant',
    category: 'Low Maintenance Plants',
    price: 16,
    image: 'https://images.unsplash.com/photo-1586163777117-da88ee74caa3?w=400',
    description: 'Succulent, requires minimal water'
  },
  {
    id: 28,
    name: 'Cast Iron Plant',
    category: 'Low Maintenance Plants',
    price: 18,
    image: 'https://images.unsplash.com/photo-1616694892951-35023a3ee1fd?w=400',
    description: 'Extremely tolerant of neglect'
  },
  {
    id: 29,
    name: 'Aglaonema',
    category: 'Low Maintenance Plants',
    price: 19,
    image: 'https://images.unsplash.com/photo-1616781831697-e4c5c5d82bb4?w=400',
    description: 'Colorful leaves, low light tolerant'
  },
  {
    id: 30,
    name: 'Philodendron',
    category: 'Low Maintenance Plants',
    price: 15,
    image: 'https://images.unsplash.com/photo-1610651992739-c449e78b9fb4?w=400',
    description: 'Fast growing, easy care'
  },

  // Flowering Plants
  {
    id: 31,
    name: 'Orchid',
    category: 'Flowering Plants',
    price: 30,
    image: 'https://images.unsplash.com/photo-1583195925431-cc05c52ac5bc?w=400',
    description: 'Elegant exotic flowers'
  },
  {
    id: 32,
    name: 'African Violet',
    category: 'Flowering Plants',
    price: 14,
    image: 'https://images.unsplash.com/photo-1588423771073-b8bda2a1b446?w=400',
    description: 'Year-round blooms, compact size'
  },
  {
    id: 33,
    name: 'Begonia',
    category: 'Flowering Plants',
    price: 16,
    image: 'https://images.unsplash.com/photo-1597000557277-84ba90f77ab2?w=400',
    description: 'Colorful flowers and foliage'
  },
  {
    id: 34,
    name: 'Hibiscus',
    category: 'Flowering Plants',
    price: 22,
    image: 'https://images.unsplash.com/photo-1598882304119-d5e7f7e18b6b?w=400',
    description: 'Large tropical blooms'
  },
  {
    id: 35,
    name: 'Geranium',
    category: 'Flowering Plants',
    price: 13,
    image: 'https://images.unsplash.com/photo-1591958911259-bee2173bdccc?w=400',
    description: 'Classic flowering plant, easy care'
  },
  {
    id: 36,
    name: 'Anthurium',
    category: 'Flowering Plants',
    price: 25,
    image: 'https://images.unsplash.com/photo-1599579531371-a16f90aa2df6?w=400',
    description: 'Heart-shaped flowers, long-lasting'
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart({ ...addedToCart, [plant.id]: true });
  };

  const isInCart = (plantId) => {
    return cartItems.some(item => item.id === plantId);
  };

  const categories = [...new Set(plantsData.map(plant => plant.category))];

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h1>Our Plant Collection</h1>
        <p>Discover our wide variety of beautiful houseplants</p>
      </div>

      {categories.map(category => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="products-grid">
            {plantsData
              .filter(plant => plant.category === category)
              .map(plant => (
                <div key={plant.id} className="product-card">
                  <div className="product-image-container">
                    <img src={plant.image} alt={plant.name} className="product-image" />
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <div className="product-footer">
                      <span className="product-price">${plant.price}</span>
                      <button
                        className={`add-to-cart-btn ${isInCart(plant.id) ? 'disabled' : ''}`}
                        onClick={() => handleAddToCart(plant)}
                        disabled={isInCart(plant.id)}
                      >
                        {isInCart(plant.id) ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
