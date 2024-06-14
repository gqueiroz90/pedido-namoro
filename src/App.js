import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  useDisclosure,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";

import foto01 from "./assets/pedido01.jpg";
import foto02 from "./assets/pedido02.jpg";
import foto03 from "./assets/pedido03.jpg";
import foto04 from "./assets/pedido04.jpg";
import foto05 from "./assets/pedido05.jpg";
import foto06 from "./assets/pedido06.jpg";
import musica from "./assets/musica.mp3";

function App() {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [buttonPosition, setButtonPosition] = useState(null);
  const [opacity, setOpacity] = useState(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const audioRef = useRef(null);

  const photos = [foto01, foto02, foto03, foto04, foto05, foto06];

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentPhoto((prevPhoto) => (prevPhoto + 1) % photos.length);
        setOpacity(1);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [photos.length]);

  useEffect(() => {
    if (isMusicPlaying && audioRef.current) {
      audioRef.current.volume = 0.1;
      audioRef.current.play();
    }
  }, [isMusicPlaying]);

  const handleNoClick = () => {
    const randomTop = Math.floor(Math.random() * 15) + "%";
    const randomLeft = Math.floor(Math.random() * 80) + "%";
    setButtonPosition({ top: randomTop, left: randomLeft });
  };

  const handleYesClick = () => {
    setIsMusicPlaying(true);
    onOpen();
  };

  return (
    <Box
      textAlign="center"
      p={5}
      bgGradient="linear(to-t, red.200, red.500)"
      height="100vh"
      overflow="hidden"
    >
      <Text fontSize="3xl" fontWeight="bold" color="white">
        Quer Namorar Comigo?
      </Text>
      <Box
        bg="white"
        p={3}
        boxShadow="lg"
        maxW="320px"
        mx="auto"
        mt={5}
        mb={5}
        border="1px solid"
        borderColor="gray.200"
        style={{ borderRadius: "10px" }}
      >
        <Image
          src={photos[currentPhoto]}
          alt="Sua Foto"
          boxSize="300px"
          mx="auto"
          objectFit="cover"
          transition="opacity 0.5s"
          opacity={opacity}
          style={{ borderRadius: "10px" }}
        />
        <Flex justifyContent="center" alignItems="center" mt={2}>
          <Text as="kbd">Nosso dia</Text>
          <IconButton
            aria-label="Curtir"
            icon={<FaHeart />}
            colorScheme="red"
            variant="ghost"
          />
          <Text as="kbd">15/06</Text>
        </Flex>
      </Box>
      <Box position="relative" h="200px">
        <Flex justifyContent="center" mt={4}>
          <Button colorScheme="teal" onClick={handleYesClick} mx={2}>
            Sim
          </Button>
          <Button
            colorScheme="red"
            position={buttonPosition ? "absolute" : "relative"}
            top={buttonPosition?.top || "auto"}
            left={buttonPosition?.left || "auto"}
            onClick={handleNoClick}
            mx={2}
          >
            Não
          </Button>
        </Flex>
      </Box>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsMusicPlaying(false);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent bg="rgba(255, 255, 255, 0.8)">
          <ModalHeader>Acertou a escolha Princesa!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Ei amor, 
              <Text></Text>
              Bem vinda "nova temporada"! hahahaha 
              <Text></Text>
              <Text></Text>
              Você me faz um bem enorme, de um jeito que nem
              sei explicar direito. Cada momento ao seu lado é
              incrível pra mim.  
              <Text></Text>
              <Text></Text>
              Em tão pouco tempo já vivemos tantos
              momentos incríveis juntos e sei que ainda temos muita coisa boa
              pela frente. Chega a bater uma ansiedade quando penso em cada novo dia com você, para
              continuarmos rindo, superando desafios e criando memórias que
              vamos guardar pra sempre. 
              <Text></Text>
              <Text></Text>
              Eu te amo muito e já não consigo
              imaginar minha vida sem você!
              <Text color="red">♥</Text>              
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
      <audio ref={audioRef} src={musica} style={{ display: "none" }} />
    </Box>
  );
}

export default App;
