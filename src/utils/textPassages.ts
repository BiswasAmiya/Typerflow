// Collection of text passages for typing tests
// These are diverse passages covering different topics and difficulty levels

export const passages: string[] = [
  `The quick brown fox jumps over the lazy dog. This simple sentence contains every letter of the English alphabet and has been used for typing practice for over a century. It demonstrates how a few carefully chosen words can serve as a complete test of keyboard proficiency.`,
  
  `Technology has transformed the way we communicate, work, and live our daily lives. From smartphones to artificial intelligence, the digital revolution continues to reshape every aspect of human existence. We must adapt to these changes while preserving what makes us fundamentally human.`,
  
  `The ocean covers more than seventy percent of our planet's surface. Its depths remain largely unexplored, harboring mysterious creatures and geological formations that challenge our understanding of the natural world. Marine biologists continue to discover new species in the darkest trenches.`,
  
  `Education is the most powerful weapon which you can use to change the world. Through learning, individuals gain the knowledge and skills necessary to improve their lives and contribute to society. Every great achievement in human history began with someone who dared to learn something new.`,
  
  `Music has the extraordinary ability to transcend language barriers and connect people across cultures. Whether it is classical symphonies, jazz improvisations, or modern electronic beats, music speaks directly to our emotions. It can heal, inspire, and unite people in ways that words alone cannot.`,
  
  `The art of cooking involves much more than simply following recipes. It requires an understanding of flavors, textures, and timing that comes only with practice and experience. Great chefs develop an intuitive sense for combining ingredients that creates something greater than the sum of its parts.`,
  
  `Climate change represents one of the greatest challenges facing humanity today. Rising temperatures, melting ice caps, and extreme weather events demand immediate action from governments, businesses, and individuals alike. The decisions we make now will determine the world our children inherit.`,
  
  `Space exploration has always captured the human imagination. From the first moon landing to modern Mars rovers, our quest to understand the cosmos drives innovation and inspires generations. Each mission pushes the boundaries of what we thought possible and reveals new mysteries to solve.`,
  
  `The human brain is perhaps the most complex structure in the known universe. With billions of neurons forming trillions of connections, it enables consciousness, creativity, and abstract thought. Neuroscientists are only beginning to understand how this remarkable organ produces the experience of being alive.`,
  
  `Architecture shapes the spaces where we live, work, and play. Great buildings combine functionality with beauty, creating environments that elevate the human spirit. From ancient temples to modern skyscrapers, architecture reflects the values and aspirations of the civilizations that create them.`,
  
  `The history of written language stretches back thousands of years. From cuneiform tablets in ancient Mesopotamia to digital text on modern screens, writing has been humanity's primary tool for preserving knowledge across generations. Each innovation in communication technology has accelerated the pace of human progress.`,
  
  `Physical exercise offers benefits that extend far beyond building muscle and endurance. Regular activity improves mental health, boosts immune function, and enhances cognitive performance. Even moderate daily exercise can significantly reduce the risk of chronic diseases and improve overall quality of life.`,
  
  `The global economy is an intricate web of trade, finance, and production that connects billions of people. Understanding economic principles helps us make better decisions about saving, investing, and spending. Markets respond to countless factors including technology, politics, and natural resources.`,
  
  `Photography has revolutionized how we document and share our experiences. From the earliest daguerreotypes to modern smartphone cameras, the ability to capture moments in time has transformed journalism, art, and personal memory. Every photograph tells a story and preserves a fragment of history.`,
  
  `The development of renewable energy sources represents a critical shift in how we power our civilization. Solar, wind, and hydroelectric power offer sustainable alternatives to fossil fuels. As technology improves and costs decrease, clean energy becomes increasingly competitive with traditional sources.`,
  
  `Literature provides a window into the human experience across time and culture. Through novels, poetry, and drama, writers explore the depths of emotion, the complexities of relationships, and the mysteries of existence. Great works of literature continue to resonate with readers centuries after they were written.`,
  
  `The scientific method represents humanity's most reliable tool for understanding the natural world. Through careful observation, hypothesis formation, and rigorous testing, scientists gradually uncover the laws that govern our universe. This systematic approach to knowledge has produced remarkable advances in medicine, physics, and biology.`,
  
  `Transportation has evolved dramatically throughout human history. From walking and animal-powered vehicles to automobiles, airplanes, and spacecraft, our ability to move quickly across great distances has transformed commerce, culture, and personal freedom. Each innovation has made the world feel smaller and more connected.`,
  
  `The philosophy of ethics examines fundamental questions about right and wrong, good and evil. Different cultures and traditions have developed various frameworks for moral reasoning, from utilitarianism to virtue ethics. These philosophical traditions continue to inform our legal systems and social norms.`,
  
  `Biodiversity is essential for the health of our planet's ecosystems. Every species plays a role in the complex web of life, from the smallest microorganism to the largest whale. Protecting biodiversity requires understanding these interconnections and taking action to preserve habitats around the world.`
];

export function getRandomPassage(): string {
  const index = Math.floor(Math.random() * passages.length);
  return passages[index];
}

export function getMultiplePassages(count: number): string {
  const shuffled = [...passages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join('\n\n');
}
