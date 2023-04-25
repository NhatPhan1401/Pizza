import "swiper/css";

import { Button, Image, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import SVG from "react-inlinesvg";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

import { useResponsive } from "../../hooks/useResponsive";
import Container from "../../layout/Container";

type Pizza = {
  title: string;
  img: string;
  id: string;
};

const pizzas: Pizza[] = [
  {
    id: uuidv4(),
    title: "Pizza Diavola",
    img: "/images/pizza-diavola.png",
  },
  {
    id: uuidv4(),
    title: "Pizza Ham",
    img: "/images/pizza-ham.png",
  },
  {
    id: uuidv4(),
    title: "Pizza Peperoni",
    img: "/images/pizza-peperoni.png",
  },
  {
    id: uuidv4(),
    title: "Pizza Seafood",
    img: "/images/pizza-seafood.png",
  },
  {
    id: uuidv4(),
    title: "Pizza Vit Duck",
    img: "/images/pizza-vit-duck.png",
  },
];

enum Size {
  s = "small",
  m = "medium",
  l = "large",
}

const Home = () => {
  const [current, setCurrent] = useState<Pizza>(pizzas[0]);
  const [size, setCurrentSize] = useState<Size>(Size.m);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const { isDesktop } = useResponsive();
  const [deg, setDeg] = useState(0);

  return (
    <Container direction="column" paddingY="2rem">
      <Stack
        w="full"
        justifyContent="center"
        alignItems="center"
        spacing="2rem"
      >
        <Text fontSize="2xl" fontWeight="semibold">
          {current?.title}
        </Text>

        <Text fontSize="xl" fontWeight="semibold" color="gray.500">
          PIZZA OF THE MONTH
        </Text>

        <Stack direction="row" spacing={8}>
          <Button
            variant="unstyled"
            borderRadius="full"
            border={
              size === Size.s
                ? "2px solid var(--chakra-colors-gray-600)"
                : "none"
            }
            bg={size === Size.s ? "white" : "transparent"}
            onClick={() => setCurrentSize(Size.s)}
          >
            <Text
              fontWeight="semibold"
              color={size === Size.s ? "black" : "gray.600"}
            >
              S
            </Text>
          </Button>
          <Button
            variant="unstyled"
            borderRadius="full"
            border={
              size === Size.m
                ? "2px solid var(--chakra-colors-gray-600)"
                : "none"
            }
            bg={size === Size.m ? "white" : "transparent"}
            onClick={() => setCurrentSize(Size.m)}
          >
            <Text
              fontWeight="semibold"
              color={size === Size.m ? "black" : "gray.600"}
            >
              M
            </Text>
          </Button>
          <Button
            variant="unstyled"
            borderRadius="full"
            border={
              size === Size.l
                ? "2px solid var(--chakra-colors-gray-600)"
                : "none"
            }
            bg={size === Size.l ? "white" : "transparent"}
            onClick={() => setCurrentSize(Size.l)}
          >
            <Text
              fontWeight="semibold"
              color={size === Size.l ? "black" : "gray.600"}
            >
              L
            </Text>
          </Button>
        </Stack>

        <Stack w="full" h="auto" position="relative">
          <Stack
            w="fit-content"
            p="12px"
            spacing="12px"
            borderRadius="full"
            bg="rgba(255,255,255,0.6)"
            position="absolute"
            top="15%"
            left="50%"
            transform="translate(-50%,-50%)"
            zIndex={2}
          >
            <Button
              variant="unstyled"
              p="8px"
              _hover={{
                svg: {
                  stroke: "orange",
                },
              }}
              ref={(node) => setNextEl(node)}
              onClick={() => setDeg(deg + 30)}
            >
              <SVG
                style={{ transition: "all 200ms ease-in-out" }}
                src="/svg/arrow-right.svg"
                width="16px"
                height="16px"
              />
            </Button>
            <Button
              variant="unstyled"
              p="8px"
              _hover={{
                svg: {
                  stroke: "orange",
                },
              }}
              ref={(node) => setPrevEl(node)}
              onClick={() => setDeg(deg - 30)}
            >
              <SVG
                style={{ transition: "all 200ms ease-in-out" }}
                src="/svg/arrow-left.svg"
                width="16px"
                height="16px"
              />
            </Button>
          </Stack>
          <Swiper
            style={{
              width: "100%",
              height: "600px",
              marginTop: "2rem",
              paddingBottom: 40,
            }}
            slidesPerView="auto"
            spaceBetween={isDesktop ? 250 : 200}
            modules={[Navigation]}
            navigation={{ prevEl, nextEl }}
            loop
            className="mySwiper"
            onSlideChange={(e) => setCurrent(pizzas[e.realIndex])}
            centeredSlides
            speed={400}
          >
            {pizzas.map((item) => (
              <SwiperSlide
                style={{
                  width: 600,
                  height: 600,
                  transform:
                    current.id !== item.id ? "translateY(200px)" : "none",
                  transition: "transform 300ms ease-in-out",
                }}
                key={item.id}
              >
                <Image
                  src={item.img}
                  sx={{
                    w: "full",
                    height: "full",
                    borderRadius: "50%",
                    border: "18px solid var(--chakra-colors-gray-200)",
                    background: "white",
                    transform: `scale(${
                      current.id === item.id
                        ? size === Size.s
                          ? 0.7
                          : size === Size.m
                          ? 0.8
                          : 1
                        : 0.8
                    }) rotate(-${deg}deg)`,
                    transition: "all 500ms ease-in-out",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Home;
