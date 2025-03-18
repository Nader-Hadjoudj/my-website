import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShowcaseSection = styled.section`
  background-color: #0a0a0a;
  width: 100vw;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: bold;

  &:after {
    content: "";
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #fff700, #ffd700);
    margin: 1rem auto 0;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductCard = styled(motion.div)`
  background-color: #141414;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
  }
`;

const ProductImage = styled(motion.div)`
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled(motion.h3)`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled(motion.p)`
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ProductStats = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  padding-top: 1rem;
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatValue = styled.div`
  color: #ffd700;
  font-size: 1.2rem;
  font-weight: bold;
`;

const StatLabel = styled.div`
  color: #a0a0a0;
  font-size: 0.8rem;
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled(motion.button)`
  background-color: #1a1a1a;
  color: #a0a0a0;
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    background-color: #ffd700;
    color: #0a0a0a;
  }

  &:hover {
    border-color: #ffd700;
    color: #ffd700;
  }

  &.active:hover {
    color: #0a0a0a;
  }
`;

const products = [
  {
    id: 1,
    name: "Green Haricots",
    description: "Fresh and tender green beans, rich in fiber and vitamins.",
    image: "/Green_Haricots.png",
    quality: "A+",
    origin: "Algeria",
    season: "Year-round"
  },
  {
    id: 2,
    name: "Red Haricots",
    description: "Nutritious and flavorful red beans, perfect for soups and stews.",
    image: "/Red_Haricots.png",
    quality: "A",
    origin: "Algeria",
    season: "Mar-Oct"
  },
  {
    id: 3,
    name: "Beetroot",
    description: "Sweet and earthy beetroot, packed with antioxidants and essential nutrients.",
    image: "/beetroot.png",
    quality: "A+",
    origin: "Algeria",
    season: "Year-round"
  },
  {
    id: 4,
    name: "Fennel",
    description: "Crisp and aromatic fennel bulbs, excellent for salads and cooking.",
    image: "/fennel.png",
    quality: "A",
    origin: "Algeria",
    season: "Oct-May"
  },
  {
    id: 5,
    name: "Artichoke",
    description: "Delicious and tender artichokes, rich in fiber and antioxidants.",
    image: "/artichoke.png",
    quality: "A+",
    origin: "Algeria",
    season: "Oct-May"
  },
  {
    id: 6,
    name: "Fresh Asparagus",
    description: "Tender and flavorful green asparagus, ideal for grilling and steaming.",
    image: "/asparagus.png",
    quality: "A",
    origin: "Algeria",
    season: "Feb-Jun"
  }
];


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15
    }
  },
  hover: { 
    y: -10,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10
    }
  }
};

const imageVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3 }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      delay: 0.2
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const statItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100
    }
  }
};

const filterContainerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1
    }
  }
};

const filterButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 200
    }
  },
  tap: { scale: 0.95 }
};

const FarmingProductsShowcase = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [isInView, setIsInView] = React.useState(false);

  const origins = [...new Set(products.map(product => product.origin))];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.origin === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ShowcaseSection ref={sectionRef}>
      <SectionTitle
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
          }
        }}
      >
        Our Premium Products
      </SectionTitle>

      <FilterContainer
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={filterContainerVariants}
      >
        <FilterButton
          variants={filterButtonVariants}
          whileTap="tap"
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          All Products
        </FilterButton>
        {origins.map(origin => (
          <FilterButton
            key={origin}
            variants={filterButtonVariants}
            whileTap="tap"
            className={activeFilter === origin ? "active" : ""}
            onClick={() => setActiveFilter(origin)}
          >
            {origin}
          </FilterButton>
        ))}
      </FilterContainer>

      <ProductsGrid>
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={product.id}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover="hover"
            variants={cardVariants}
            transition={{ delay: index * 0.1 }}
          >
            <ProductImage 
              variants={imageVariants}
              style={{ backgroundImage: `url(${product.image || 'https://via.placeholder.com/400x200'})` }} 
            />
            <ProductInfo>
              <ProductName variants={textVariants}>
                {product.name}
              </ProductName>
              <ProductDescription variants={textVariants}>
                {product.description}
              </ProductDescription>
              <ProductStats variants={statsVariants}>
                <StatItem variants={statItemVariants}>
                  <StatValue>{product.quality}</StatValue>
                  <StatLabel>Quality</StatLabel>
                </StatItem>
                <StatItem variants={statItemVariants}>
                  <StatValue>{product.origin}</StatValue>
                  <StatLabel>Origin</StatLabel>
                </StatItem>
                <StatItem variants={statItemVariants}>
                  <StatValue>{product.season}</StatValue>
                  <StatLabel>Season</StatLabel>
                </StatItem>
              </ProductStats>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ShowcaseSection>
  );
};

export default FarmingProductsShowcase;