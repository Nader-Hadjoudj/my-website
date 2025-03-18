import React, { useEffect, useRef, useState } from "react";
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
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 2.5rem;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 3rem;
    margin-bottom: 4rem;
  }

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #fff700, #ffd700);
    margin: 0.8rem auto 0;
    
    @media (min-width: 768px) {
      width: 100px;
      margin: 1rem auto 0;
    }
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
  }
`;

const ProductCard = styled(motion.div)`
  background-color: #141414;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
  transition: box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
  }
`;

const ProductImage = styled(motion.div)`
  height: 160px;
  background-size: cover;
  background-position: center;
  position: relative;
  
  @media (min-width: 768px) {
    height: 200px;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
`;

const ProductInfo = styled.div`
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const ProductName = styled(motion.h3)`
  color: #ffd700;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const ProductDescription = styled(motion.p)`
  color: #e0e0e0;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: auto;
  
  @media (min-width: 768px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
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
  font-size: 1.1rem;
  font-weight: bold;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StatLabel = styled.div`
  color: #a0a0a0;
  font-size: 0.75rem;
  
  @media (min-width: 768px) {
    font-size: 0.8rem;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  
  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const FilterButton = styled(motion.button)`
  background-color: #1a1a1a;
  color: #a0a0a0;
  border: 1px solid rgba(255, 215, 0, 0.3);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    margin-bottom: 0;
  }

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

// Animation variants optimized for mobile
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 80,
      damping: 15
    }
  },
  hover: (isMobile) => ({ 
    y: isMobile ? -5 : -10,
    transition: { 
      type: "spring", 
      stiffness: isMobile ? 300 : 400,
      damping: 10
    }
  })
};

const imageVariants = {
  hover: { 
    scale: 1.03,
    transition: { duration: 0.3 }
  }
};

const textVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      delay: 0.1
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const statItemVariants = {
  hidden: { opacity: 0, y: 8 },
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
  hidden: { opacity: 0, y: -15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 90,
      damping: 15,
      staggerChildren: 0.08
    }
  }
};

const filterButtonVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 180
    }
  },
  tap: { scale: 0.95 }
};

const FarmingProductsShowcase = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isInView, setIsInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const origins = [...new Set(products.map(product => product.origin))];

  // Filter products based on selected origin
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.origin === activeFilter));
    }
  }, [activeFilter]);

  // Check if section is in view
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (section) {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.8) {
          setIsInView(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <ShowcaseSection ref={sectionRef}>
      <SectionTitle
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" }
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
            custom={isMobile}
            transition={{ delay: Math.min(index * 0.1, 0.5) }} // Limit max delay for mobile
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