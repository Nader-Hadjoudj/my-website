import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShowcaseSection = styled.section`
  background-color: #0a0a0a;
  position: relative;
  overflow: hidden;
  width: 100vw;
  margin: 0;
  padding: 6rem 2rem;
  box-sizing: border-box;
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
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
  }
`;

const ProductCard = styled(motion.div)`
  background-color: #141414;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    border-radius: 8px;
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
    width: 100%;
    height: 30%;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
  
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const ProductName = styled(motion.h3)`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.3rem;
  }
`;

const ProductDescription = styled(motion.p)`
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: 0.7rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

const ProductStats = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  padding-top: 1rem;
  
  @media (max-width: 768px) {
    margin-top: 0.6rem;
    padding-top: 0.6rem;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
`;

const StatValue = styled.div`
  color: #ffd700;
  font-size: 1.2rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const StatLabel = styled.div`
  color: #a0a0a0;
  font-size: 0.8rem;
  
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const FilterContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
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
  
  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.7rem;
    border-radius: 15px;
  }
`;

const products = [
  {
    id: 1,
    nameKey: "products.greenHaricots.name",
    descriptionKey: "products.greenHaricots.description",
    image: "/Green_Haricots.png",
    quality: "A+",
    origin: "Algeria",
    season: "Year-round",
  },
  {
    id: 2,
    nameKey: "products.redHaricots.name",
    descriptionKey: "products.redHaricots.description",
    image: "/Red_Haricots.png",
    quality: "A",
    origin: "Algeria",
    season: "Mar-Oct",
  },
  {
    id: 3,
    nameKey: "products.beetroot.name",
    descriptionKey: "products.beetroot.description",
    image: "/beetroot.png",
    quality: "A+",
    origin: "Algeria",
    season: "Year-round",
  },
  {
    id: 4,
    nameKey: "products.fennel.name",
    descriptionKey: "products.fennel.description",
    image: "/fennel.png",
    quality: "A",
    origin: "Algeria",
    season: "Oct-May",
  },
  {
    id: 5,
    nameKey: "products.artichoke.name",
    descriptionKey: "products.artichoke.description",
    image: "/artichoke.png",
    quality: "A+",
    origin: "Algeria",
    season: "Oct-May",
  },
  {
    id: 6,
    nameKey: "products.asparagus.name",
    descriptionKey: "products.asparagus.description",
    image: "/asparagus.png",
    quality: "A",
    origin: "Algeria",
    season: "Feb-Jun",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15,
    },
  },
  hover: { 
    y: -10,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10,
    },
  },
};

const imageVariants = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.3 },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      delay: 0.2,
    },
  },
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
    },
  },
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
      staggerChildren: 0.1,
    },
  },
};

const filterButtonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 200,
    },
  },
  tap: { scale: 0.95 },
};

const FarmingProductsShowcase = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = React.useState("all");
  const [filteredProducts, setFilteredProducts] = React.useState(products);
  const [isInView, setIsInView] = React.useState(false);
  const { t } = useTranslation();

  const origins = [...new Set(products.map((product) => product.origin))];

  const scrollToHeroSection = () => {
    const heroSection = document.getElementById("FarmingHeroSection");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // Automatically download 'catalogue.pdf' if the element is not found
      const link = document.createElement('a');
      link.href = '/files/catalogue.pdf'; // Path relative to 'public' folder
      link.download = 'catalogue.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.origin === activeFilter)
      );
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

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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
            transition: { duration: 0.8, ease: "easeOut" },
          },
        }}
      >
        {t("showcase.title")}
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
          {t("showcase.filters.all")}
        </FilterButton>
        {origins.map((origin) => (
          <FilterButton
            key={origin}
            variants={filterButtonVariants}
            whileTap="tap"
            className={activeFilter === origin ? "active" : ""}
            onClick={() => setActiveFilter(origin)}
          >
            {t(`showcase.filters.${origin.toLowerCase()}`)}
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
            onClick={scrollToHeroSection}
          >
            <ProductImage
              variants={imageVariants}
              style={{
                backgroundImage: `url(${
                  product.image || "https://via.placeholder.com/400x200"
                })`,
              }}
            />
            <ProductInfo>
              <ProductName variants={textVariants}>
                {t(product.nameKey)}
              </ProductName>
              <ProductDescription variants={textVariants}>
                {t(product.descriptionKey)}
              </ProductDescription>
              <ProductStats variants={statsVariants}>
                <StatItem variants={statItemVariants}>
                  <StatValue>{product.quality}</StatValue>
                  <StatLabel>{t("showcase.stats.quality")}</StatLabel>
                </StatItem>
                <StatItem variants={statItemVariants}>
                  <StatValue>{product.origin}</StatValue>
                  <StatLabel>{t("showcase.stats.origin")}</StatLabel>
                </StatItem>
                <StatItem variants={statItemVariants}>
                  <StatValue>{product.season}</StatValue>
                  <StatLabel>{t("showcase.stats.season")}</StatLabel>
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