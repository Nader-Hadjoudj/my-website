<FeaturesSection ref={featuresRef}>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {t('landing.whyChooseUs', 'Why Choose Stormmaze')}
        </SectionTitle>
        
        <FeaturesGrid>
          <FeatureCard className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>{t('landing.features.quality.title', 'Premium Quality')}</FeatureTitle>
            <FeatureDescription>
              {t('landing.features.quality.description', 'Our rigorous quality control ensures only the finest produce reaches your business, with A+ grade certification.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>{t('landing.features.sustainable.title', 'Sustainable Practices')}</FeatureTitle>
            <FeatureDescription>
              {t('landing.features.sustainable.description', 'Environmental responsibility is at our core. We partner with farms committed to sustainable agricultural practices.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>{t('landing.features.reliable.title', 'Reliable Supply Chain')}</FeatureTitle>
            <FeatureDescription>
              {t('landing.features.reliable.description', 'Our streamlined logistics ensure year-round availability and on-time delivery of fresh produce to your business.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>{t('landing.features.transparent.title', 'Full Transparency')}</FeatureTitle>
            <FeatureDescription>
              {t('landing.features.transparent.description', 'We provide complete traceability of all our products, from Algerian farms to your French business.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>{t('landing.features.relationships.title', 'Direct Farmer Relationships')}</FeatureTitle>
            <FeatureDescription>
              {t('landing.features.relationships.description', 'We work directly with Algerian farmers, ensuring fair trade practices and supporting local communities.')}
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <FeatureIcon>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </FeatureIcon>
            <FeatureTitle>{t('landing.features.compliance.title', 'Regulatory Compliance')}</FeatureTitle>
            <FeatureDescription>
              {t('landing.features.compliance.description', 'All our imports meet EU and French regulatory standards, with complete documentation and certification.')}
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>