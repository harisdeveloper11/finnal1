import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO, TechCorp',
    review:
      'This e-commerce site is fantastic! The user experience is seamless and the products are top-notch.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 2,
    name: 'Michael Smith',
    role: 'Marketing Manager',
    review:
      'Amazing service and fast delivery. I’ve been recommending it to all my friends!',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Entrepreneur',
    review:
      'I love the clean design and responsive layout. Shopping here feels smooth and enjoyable.',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    id: 4,
    name: 'David Lee',
    role: 'Software Engineer',
    review:
      'One of the best shopping experiences I’ve ever had. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-6 theme-bg flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold theme-text">
            What Our Customers Say
          </h2>
          <p className="mt-2 theme-text-muted">
            Trusted by thousands of happy customers worldwide
          </p>
        </div>

        <Swiper
          className="w-full"
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          spaceBetween={20}
          loop={true}
          centeredSlides={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 3 },
          }}
          grabCursor={true}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="theme-surface rounded-2xl shadow-2xl p-6 transition duration-300 hover:shadow-2xl flex flex-col items-center text-center backdrop-blur-md border border-white/10 min-h-[320px] justify-between"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-white/20"
                />
                <h3 className="text-lg font-semibold theme-text">{t.name}</h3>
                <p className="text-sm theme-text-muted">{t.role}</p>
                <p className="mt-3 theme-text-muted italic">"{t.review}"</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
