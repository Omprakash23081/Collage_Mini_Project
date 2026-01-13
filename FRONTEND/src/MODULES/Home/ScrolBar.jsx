import { useEffect, useState } from "react";
import style from "./ScrolBar.module.css";
import { bannerService } from "../../services/bannerService";

const DEFAULT_SLIDES = [
  {
    _id: "demo-1",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2940&auto=format&fit=crop",
    title: "Welcome to StudySharp",
    description: "Your gateway to academic excellence and resources. Start learning today!",
    link: ""
  },
  {
    _id: "demo-2", 
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2940&auto=format&fit=crop",
    title: "Latest Tech Trends",
    description: "Stay updated with the newest developments in technology and AI.",
    link: ""
  },
  {
    _id: "demo-3",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2940&auto=format&fit=crop",
    title: "Community Events",
    description: "Join our vibrant community of learners, innovators, and future leaders.",
    link: ""
  }
];

function ScrolBar() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await bannerService.getBanners();
      const fetchedBanners = response.data.data || [];
      if (fetchedBanners.length > 0) {
        setSlides(fetchedBanners);
      } else {
        setSlides(DEFAULT_SLIDES); // Fallback to default if no banners
      }
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setSlides(DEFAULT_SLIDES); // Fallback on error too
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds per slide

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSlideClick = (link) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  if (loading) {
    return (
      <div className={style.carousel_container} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // No null return here since we always have at least default slides

  return (
    <div className={style.carousel_container}>
      <div 
        className={style.carousel_track}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div 
            key={slide._id} 
            className={style.slide}
            onClick={() => handleSlideClick(slide.link)}
            style={{ cursor: slide.link ? 'pointer' : 'default' }}
          >
            <img src={slide.image} alt={slide.title} />
            <div className={style.overlay}>
              <div className={style.content}>
                 <h2>{slide.title}</h2>
                 <p>{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className={style.indicators}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${style.dot} ${currentSlide === index ? style.active : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScrolBar;
