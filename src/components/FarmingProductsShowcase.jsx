import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShowcaseSection = styled.section`
  background-color: #0a0a0a;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
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

const ProductCard = styled.div`
  background-color: #141414;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  transform: translateY(50px);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.2);
  }
`;

const ProductImage = styled.div`
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
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  color: #ffd700;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`;

const ProductDescription = styled.p`
  color: #e0e0e0;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ProductStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  padding-top: 1rem;
`;

const StatItem = styled.div`
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

const products = [
  {
    id: 1,
    name: "Premium Tomatoes",
    description: "Our vine-ripened tomatoes are grown with care in our specialized greenhouses.",
    image: "/error-strawberry.png",
    quality: "A+",
    origin: "Spain",
    season: "Year-round"
  },
  {
    id: 2,
    name: "Organic Peppers",
    description: "Sweet and colorful peppers grown using organic methods without pesticides.",
    image: "/images/peppers.jpg",
    quality: "A",
    origin: "Morocco",
    season: "Jun-Oct"
  },
  {
    id: 3,
    name: "Fresh Lettuce",
    description: "Crisp and nutritious lettuce varieties, harvested at peak freshness.",
    image: "/images/lettuce.jpg",
    quality: "A+",
    origin: "France",
    season: "Mar-Nov"
  },
  {
    id: 4,
    name: "Exotic Eggplants",
    description: "Glossy purple eggplants with tender flesh and minimal seeds.",
    image: "/images/eggplants.jpg",
    quality: "A",
    origin: "Italy",
    season: "May-Sep"
  },
  {
    id: 5,
    name: "Sweet Corn",
    description: "Golden corn with perfect sweetness, ideal for grilling or boiling.",
    image: "/images/corn.jpg",
    quality: "A+",
    origin: "USA",
    season: "Jun-Aug"
  },
  {
    id: 6,
    name: "Fresh Asparagus",
    description: "Tender green asparagus spears with excellent flavor and texture.",
    image: "/images/asparagus.jpg",
    quality: "A",
    origin: "Peru",
    season: "Feb-Jun"
  }
];

const FarmingProductsShowcase = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.from(sectionRef.current.querySelector("h2"), {
      scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    });

    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: "top 85%" },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out"
      });
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <ShowcaseSection ref={sectionRef}>
      <SectionTitle>Our Premium Products</SectionTitle>
      <ProductsGrid>
        {products.map((product, i) => (
          <ProductCard key={product.id} ref={el => cardsRef.current[i] = el}>
            <ProductImage style={{ backgroundImage: `url(${product.image || 'https://via.placeholder.com/400x200'})` }} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductStats>
                <StatItem><StatValue>{product.quality}</StatValue><StatLabel>Quality</StatLabel></StatItem>
                <StatItem><StatValue>{product.origin}</StatValue><StatLabel>Origin</StatLabel></StatItem>
                <StatItem><StatValue>{product.season}</StatValue><StatLabel>Season</StatLabel></StatItem>
              </ProductStats>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsGrid>
    </ShowcaseSection>
  );
};

export default FarmingProductsShowcase;
