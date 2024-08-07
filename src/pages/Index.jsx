import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PawPrint, Heart, Info, Cat, ArrowRight, Sun, Moon, ChevronUp } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useTheme } from "next-themes";

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the purr.",
  "The first cat in space was French. Her name was Felicette.",
  "Cats can jump up to six times their length.",
  "A cat's nose print is unique, like a human's fingerprint.",
  "Cats can rotate their ears 180 degrees.",
  "The oldest known pet cat was found in a 9,500-year-old grave on Cyprus.",
];

const catImages = [
  "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
];

const Index = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [isFactVisible, setIsFactVisible] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const { setTheme, theme } = useTheme();
  const headerRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);

  const showNextFact = () => {
    setIsFlipped(true);
    setTimeout(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % catFacts.length);
      setIsFlipped(false);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(showNextFact, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-200 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900 transition-colors duration-500">
      <div className="max-w-5xl mx-auto relative">
        <motion.div 
          ref={headerRef}
          style={{ y }}
          className="sticky top-0 z-10 bg-opacity-80 bg-white dark:bg-opacity-80 dark:bg-gray-800 backdrop-blur-md p-4 rounded-b-lg shadow-lg"
        >
          <motion.h1 
            className="text-6xl font-bold mb-2 text-center text-purple-800 dark:text-purple-300"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Fascinating Felines
          </motion.h1>
          <p className="text-center text-gray-600 dark:text-gray-300">Explore the wonderful world of cats</p>
        </motion.div>

        <Button
          className="fixed bottom-4 right-4 rounded-full p-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </Button>

        <Button
          className="fixed bottom-4 left-4 rounded-full p-2 bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
          onClick={scrollToTop}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
        
        <Carousel className="mb-12" opts={{ loop: true }}>
          <CarouselContent>
            {catImages.map((src, index) => (
              <CarouselItem key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img 
                    src={src}
                    alt={`Cat ${index + 1}`}
                    className="mx-auto object-cover w-full h-[500px] rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 rounded-lg"></div>
                  <p className="absolute bottom-4 left-4 text-white text-xl font-semibold">Majestic Cat {index + 1}</p>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Tabs defaultValue="characteristics" className="mb-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="characteristics">Cat Characteristics</TabsTrigger>
            <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
          </TabsList>
          <TabsContent value="characteristics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PawPrint className="mr-2" />
                  Characteristics of Cats
                </CardTitle>
                <CardDescription>What makes cats unique?</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6">
                  {["Independent nature", "Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially hearing and night vision", "Communicate through vocalizations, body language, and scent"].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="mb-2 flex items-center"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Heart className="mr-2 text-red-500" size={16} />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="breeds">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="mr-2" />
                  Popular Cat Breeds
                </CardTitle>
                <CardDescription>Some well-known cat breeds around the world</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-none pl-6">
                  {[
                    { breed: "Siamese", description: "Known for their distinctive coloring and vocal nature" },
                    { breed: "Maine Coon", description: "Large, fluffy cats with tufted ears" },
                    { breed: "Persian", description: "Recognizable by their flat faces and long, luxurious coats" },
                    { breed: "Bengal", description: "Wild-looking cats with leopard-like spots" },
                    { breed: "Scottish Fold", description: "Characterized by their folded ears" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="mb-4"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <strong className="text-lg text-purple-700">{item.breed}:</strong> {item.description}
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="overflow-hidden mb-12">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <CardTitle className="flex items-center text-2xl">
              <Cat className="mr-2" />
              Did You Know?
            </CardTitle>
            <CardDescription className="text-purple-100">Fascinating cat facts</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flip-card" style={{ perspective: '1000px' }}>
              <motion.div
                className="flip-card-inner"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flip-card-front bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md absolute w-full h-full backface-hidden">
                  <p className="text-xl text-center">{catFacts[currentFactIndex]}</p>
                </div>
                <div className="flip-card-back bg-purple-100 dark:bg-purple-900 p-6 rounded-lg shadow-md absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
                  <p className="text-xl text-center">{catFacts[(currentFactIndex + 1) % catFacts.length]}</p>
                </div>
              </motion.div>
            </div>
            <div className="flex justify-center mt-6">
              <Button 
                onClick={showNextFact} 
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">Next Fact</span>
                <motion.div
                  className="absolute inset-0 bg-purple-700"
                  initial={{ scale: 0, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                />
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;

const styles = `
  .flip-card {
    background-color: transparent;
    width: 100%;
    height: 200px;
  }
  
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
  }
  
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// Inject the styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
