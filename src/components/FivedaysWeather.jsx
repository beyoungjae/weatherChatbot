import styled, { keyframes } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import React, { useState, useEffect, useContext, useMemo } from 'react'
import { getCurrentWeather, getFiveDayWeather } from '../api/weatherApi'
import { ThemeContext } from '../components/ThemeContext'
import ManIcon from '@mui/icons-material/Man'
import WomanIcon from '@mui/icons-material/Woman'
import CircularProgress from '@mui/material/CircularProgress'
import { setFivedays } from '../features/weather/fivedaysSlice'
import '../components/css/FivedaysWeather.css'

// 스타일 및 애니메이션은 ai 참고

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`

const MainTitle = styled.div`
   font-size: 3.5rem;
   font-weight: bold;
   background: ${(props) => props.theme.gradient};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   margin-bottom: 40px;
   text-align: center;
   word-break: keep-all;
   animation: ${float} 3s ease-in-out infinite;

   @media (max-width: 768px) {
      font-size: 2.5rem;
   }

   @media (max-width: 480px) {
      font-size: 2rem;
   }
`

const Card = styled.div`
   background: ${(props) => (props.$isDarkMode ? '#1a1a1a' : 'white')};
   color: ${(props) => (props.$isDarkMode ? 'white' : 'black')};
   border-radius: 20px;
   padding: 35px;
   box-shadow: ${(props) => (props.$isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)')};
   width: 100%;
   max-width: 1000px;
   transition: all 0.4s ease;
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 25px;
   backdrop-filter: blur(8px);
   border: 1px solid ${(props) => (props.$isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')};
   margin: 0 auto;

   &:hover {
      box-shadow: ${(props) => (props.$isDarkMode ? '0 12px 48px rgba(0, 0, 0, 0.4)' : '0 12px 48px rgba(0, 0, 0, 0.15)')};
   }
`

const WeatherInfo = styled.div`
   display: flex;
   align-items: center;
   gap: 30px;
   padding: 25px;
   background: ${(props) => (props.$isDarkMode ? '#2d2d2d' : '#f8f9fa')};
   border-radius: 16px;
   width: 100%;
   animation: ${slideIn} 0.6s ease-out;
   transition: all 0.3s ease;

   &:hover {
      transform: translateY(-5px);
      box-shadow: ${(props) => (props.$isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)')};
   }
`

const Title = styled.h2`
   font-size: 2.2rem;
   font-weight: 600;
   margin: 0;
   background: ${(props) => (props.$isDarkMode ? 'linear-gradient(135deg, #e0e0e0, #ffffff)' : 'linear-gradient(135deg, #2d2d2d, #000000)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
   animation: ${slideIn} 0.4s ease-out;
`

const Temperature = styled.div`
   font-size: 3rem;
   font-weight: bold;
   margin-bottom: 10px;
   background: ${(props) => (props.$isDarkMode ? 'linear-gradient(135deg, #4F378B, #FFD8E4)' : 'linear-gradient(135deg, #05c9ff, #09ff36)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
`

const WeatherDetails = styled.div`
   display: flex;
   flex-direction: column;
   gap: 12px;
   font-size: 1.2rem;
   animation: ${slideIn} 0.8s ease-out;
`

const WeatherIcon = styled.img`
   width: 100px;
   height: 100px;
   filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
   animation: ${slideIn} 0.6s ease-out;
   transition: all 0.3s ease;

   &:hover {
      transform: scale(1.1);
   }
`

const Title2 = styled.h2`
   font-size: 2.2rem;
   font-weight: 600;
   margin: 0;
   background: ${(props) => (props.$isDarkMode ? 'linear-gradient(135deg, #e0e0e0, #ffffff)' : 'linear-gradient(135deg, #2d2d2d, #000000)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
`

const StyleRecommendContainer = styled.div`
   display: flex;
   justify-content: space-between;
   width: 100%;
   gap: 30px;
   margin-top: 20px;

   @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
   }
`

const RecommendBox = styled.div`
   flex: 1;
   background: ${(props) => (props.$isDarkMode ? '#2d2d2d' : '#f8f9fa')};
   border-radius: 15px;
   padding: 20px;
   display: flex;
   flex-direction: column;
   gap: 15px;
   transition: all 0.3s ease;

   &:hover {
      transform: translateY(-5px);
      box-shadow: ${(props) => (props.$isDarkMode ? '0 8px 24px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)')};
   }
`

const StyleImage = styled.img`
   width: 100%;
   height: 200px;
   object-fit: cover;
   border-radius: 10px;
   margin-bottom: 10px;
`

const RecommendTitle = styled.div`
   font-size: 1.2rem;
   font-weight: bold;
   display: flex;
   align-items: center;
   gap: 8px;
`

const RecommendText = styled.div`
   font-size: 1rem;
   line-height: 1.5;
   color: ${(props) => (props.$isDarkMode ? '#e0e0e0' : '#4a4a4a')};
`

const FiveDaysWeatherInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   width: 100%;
`

const ForecastItem = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 15px;
   background: ${(props) => (props.$isDarkMode ? '#2d2d2d' : '#f8f9fa')};
   border-radius: 10px;
   transition: all 0.3s ease;

   &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
   }

   @media (max-width: 768px) {
      flex-direction: column;
      gap: 15px;
   }
`

const ForecastDetail = styled.div`
   display: flex;
   align-items: center;
   gap: 10px;

   @media (max-width: 768px) {
      flex-wrap: wrap;
      justify-content: center;
   }
`

const WeatherDetail = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 5px;
   min-width: 80px;

   .label {
      font-size: 0.8rem;
      color: ${(props) => (props.$isDarkMode ? '#a0a0a0' : '#666')};
   }

   .value {
      font-weight: bold;
   }
`

const Title3 = styled.h2`
   font-size: 2.2rem;
   font-weight: 600;
   margin: 0;
   background: ${(props) => (props.$isDarkMode ? 'linear-gradient(135deg, #e0e0e0, #ffffff)' : 'linear-gradient(135deg, #2d2d2d, #000000)')};
   -webkit-background-clip: text;
   -webkit-text-fill-color: transparent;
`

// 온도별 옷차림 추천 함수 추가
const getClothingRecommendation = (temp, gender) => {
   if (gender === 'male') {
      if (temp <= -5) {
         return '패딩 또는 두꺼운 코트, 목도리, 장갑, 기모바지, 부츠'
      } else if (temp <= 4) {
         return '코트, 가죽자켓, 히트텍, 니트, 청바지, 목도리'
      } else if (temp <= 8) {
         return '자켓, 트렌치코트, 니트, 청바지, 목도리'
      } else if (temp <= 11) {
         return '자켓, 가디건, 야상, 청바지, 스니커즈'
      } else if (temp <= 16) {
         return '얇은 니트, 맨투맨, 가디건, 청바지'
      } else if (temp <= 19) {
         return '얇은 가디건, 긴팔티, 면바지, 청바지'
      } else {
         return '반팔, 반바지, 얇은 셔츠, 면바지'
      }
   } else {
      if (temp <= -5) {
         return '두꺼운 패딩, 목도리, 장갑, 기모레깅스, 부츠'
      } else if (temp <= 4) {
         return '코트, 히트텍, 니트, 청바지, 부츠'
      } else if (temp <= 8) {
         return '트렌치코트, 니트, 스커트, 스타킹'
      } else if (temp <= 11) {
         return '자켓, 가디건, 원피스, 스타킹'
      } else if (temp <= 16) {
         return '얇은 니트, 가디건, 청바지, 원피스'
      } else if (temp <= 19) {
         return '얇은 가디건, 블라우스, 면바지, 원피스'
      } else {
         return '반팔 원피스, 반바지, 민소매, 얇은 셔츠'
      }
   }
}

// 온도별 스타일 이미지 URL 함수 수정
const getStyleImage = (temp, gender) => {
   if (gender === 'male') {
      if (temp <= -5) {
         return [
            'https://images.unsplash.com/photo-1516384903227-139a8cf0ec21?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1511653367532-878246b8732d?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1610871276695-5e79e9cd497c?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 4) {
         return [
            'https://images.unsplash.com/photo-1729955030931-6ba22cee2a77?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1729980634336-05fe2d059b5f?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1731021347639-8aac941f5e29?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 8) {
         return [
            'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1671135590215-ded219822a44?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1731589802956-b4693dae884b?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 11) {
         return [
            'https://images.unsplash.com/photo-1559582798-678dfc71ccd8?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1543960713-7538001f7c7d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1520367745676-56196632073f?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 16) {
         return [
            'https://images.unsplash.com/photo-1623756598261-2092cc878b63?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1672239496593-f51cdc01c0f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1602052127025-fe037b6bba38?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 19) {
         return [
            'https://images.unsplash.com/photo-1599725728689-f5c3cbb086ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1629244032690-1c243449f90a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1688497830977-f9ab9f958ca7?q=80&w=1951&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else {
         return [
            'https://plus.unsplash.com/premium_photo-1690038783969-8ef5d2c7c211?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1690366910332-6cb1dc10c000?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1688497831197-9c792767fb8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fCVFQiU4MiVBOCVFQyU5RSU5MCUyMCVFRCU4QyVBOCVFQyU4NSU5OHxlbnwwfHwwfHx8MA%3D%3D',
         ]
      }
   } else {
      if (temp <= -5) {
         return [
            'https://images.unsplash.com/photo-1651489337165-f0f62bc3fc9e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1621786030484-4c855eed6974?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1635693056259-c6e95113dbee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 4) {
         return [
            'https://images.unsplash.com/photo-1651489349274-a101d0c684c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1640633368178-7b461c9fcad7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1656258762138-f834870c29b0?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 8) {
         return [
            'https://images.unsplash.com/photo-1553984658-d17e19aa281a?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1524255684952-d7185b509571?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 11) {
         return [
            'https://images.unsplash.com/photo-1505658987230-6e74e5ffacd6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1727173961758-03ec09a44f1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1689575249648-140fa6a0aeee?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 16) {
         return [
            'https://plus.unsplash.com/premium_photo-1689575248589-3944a725bda3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1689575249310-5bc6d97a2d56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fCVFQyU5NyVBQyVFQyU5RSU5MCUyMCVFRCU4QyVBOCVFQyU4NSU5OHxlbnwwfHwwfHx8MA%3D%3D',
            'https://images.unsplash.com/photo-1713448721040-74797ab528fb?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else if (temp <= 19) {
         return [
            'https://images.unsplash.com/photo-1604182440345-4a82e1c3876b?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://plus.unsplash.com/premium_photo-1727967194040-f5442cc64ef6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1641236908008-0c16051d8d13?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      } else {
         return [
            'https://plus.unsplash.com/premium_photo-1690038780524-9d3776d635d2?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1518739484259-ccaa0e094272?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1718225729835-3ac920f9a299?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
         ]
      }
   }
}

// 전체 컨테이너 스타일 수정
const WeatherContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 25px;
   max-width: 1200px;
   margin: 0 auto;
   padding: 20px;

   @media (max-width: 768px) {
      padding: 15px;
   }
`

function FivedaysWeather() {
   // 검색 값 가져오기
   const searchValue = useSelector((state) => state.search.searchValue)
   // 디스패치 함수 가져오기
   const dispatch = useDispatch()
   // 테마 가져오기
   const { isDarkMode } = useContext(ThemeContext)
   // 날씨 상태 가져오기
   const [weather, setWeather] = useState(null)
   // 로딩 상태 가져오기
   const [loading, setLoading] = useState(true)
   // 에러 상태 가져오기
   const [error, setError] = useState(null)
   // 5일 날씨 상태 가져오기
   const fivedays = useSelector((state) => state.fivedays.fivedays)

   // 검색 값이 변경될 때마다 날씨 정보 가져오기
   useEffect(() => {
      const fetchWeather = async () => {
         try {
            setLoading(true) // 로딩 상태 설정
            const response = await getCurrentWeather(searchValue) // 현재 날씨 가져오기
            setWeather(response.data) // 현재 날씨 저장
            setError(null) // 에러 메시지 저장
         } catch (err) {
            setError('날씨 정보를 불러오는데 실패했습니다.') // 에러 메시지 저장
         } finally {
            setLoading(false) // 로딩 상태 해제
         }
      }

      if (searchValue) {
         fetchWeather()
      }
   }, [searchValue])

   // filterDailyForecasts 함수를 useMemo로 최적화
   const filterDailyForecasts = useMemo(
      () => (forecasts) => {
         if (!forecasts || !Array.isArray(forecasts)) {
            return [] // 예외 처리
         }
         // 오늘 날짜 가져오기
         const dailyForecasts = {} // 오늘 날짜 저장
         const today = new Date().toLocaleDateString()

         forecasts.forEach((forecast) => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString() // 날짜 가져오기
            // 오늘 날짜는 건너뛰기
            if (date === today) return
            // 오늘 날짜와 예보 날짜 비교
            if (!dailyForecasts[date] || Math.abs(new Date(forecast.dt * 1000).getHours() - 12) < Math.abs(new Date(dailyForecasts[date].dt * 1000).getHours() - 12)) {
               dailyForecasts[date] = forecast // 오늘 날짜와 예보 날짜 비교
            }
         })

         const result = Object.values(dailyForecasts) // 오늘 날짜 저장
         // 콘솔 경고 한 번만 출력
         if (process.env.NODE_ENV === 'development' && result.length < 5) {
            console.warn(`Retrieved ${result.length} days of forecast data`, {
               once: true,
            })
         }
         return result // 오늘 날짜 반환
      },
      []
   )

   // useEffect 수정
   useEffect(() => {
      const fetchFiveDaysWeather = async () => {
         if (!searchValue) return // 검색 값이 없으면 반환

         try {
            const data = await getFiveDayWeather(searchValue) // 5일 날씨 가져오기
            if (data && data.list && Array.isArray(data.list)) {
               dispatch(setFivedays(data.list)) // 5일 날씨 저장
               setError(null)
            } else {
               setError('날씨 데이터가 없습니다.') // 날씨 데이터가 없으면 에러 메시지 저장
            }
         } catch (error) {
            console.error('날씨 데이터를 불러오는데 실패했습니다.', error) // 에러 메시지 출력
            setError('날씨 데이터를 불러오는데 실패했습니다.') // 에러 메시지 저장
         }
      }

      fetchFiveDaysWeather()
   }, [searchValue, dispatch])

   // 로딩 중일 때 로딩 아이콘 반환
   if (loading) {
      return (
         <Card $isDarkMode={isDarkMode}>
            <CircularProgress />
         </Card>
      )
   }

   // 에러 상태일 때 에러 메시지 반환
   if (error) {
      return (
         <Card $isDarkMode={isDarkMode}>
            <div>{error}</div>
         </Card>
      )
   }

   return (
      <WeatherContainer>
         <MainTitle $isDarkMode={isDarkMode}>{searchValue} 날씨 정보</MainTitle>
         <Card $isDarkMode={isDarkMode} className="current-weather">
            <Title $isDarkMode={isDarkMode}>{searchValue} 현재 날씨</Title>
            <WeatherInfo $isDarkMode={isDarkMode}>
               <div>
                  <WeatherIcon src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather icon" />
               </div>
               <WeatherDetails $isDarkMode={isDarkMode}>
                  <Temperature $isDarkMode={isDarkMode}>{Math.round(weather?.main.temp)}°C</Temperature>
                  <div>{weather?.weather[0].description}</div>
                  <div>체감온도: {Math.round(weather?.main.feels_like)}°C</div>
                  <div>습도: {weather?.main.humidity}%</div>
               </WeatherDetails>
            </WeatherInfo>
         </Card>

         <Card $isDarkMode={isDarkMode} className="style-recommend">
            <Title2 $isDarkMode={isDarkMode}>스타일 추천</Title2>
            <StyleRecommendContainer>
               {/* 남자 추천룩 */}
               <RecommendBox $isDarkMode={isDarkMode}>
                  <RecommendTitle>
                     <ManIcon /> 남자 추천룩
                  </RecommendTitle>
                  {/* 이미지 랜덤으로 추천 */}
                  <StyleImage src={getStyleImage(Math.round(weather?.main.temp), 'male')[Math.floor(Math.random() * 3)]} alt="남성 패션" />
                  <div>현재 기온: {Math.round(weather?.main.temp)}°C</div>
                  <RecommendText $isDarkMode={isDarkMode}>{getClothingRecommendation(Math.round(weather?.main.temp), 'male')}</RecommendText>
               </RecommendBox>

               {/* 여자 추천룩 */}
               <RecommendBox $isDarkMode={isDarkMode}>
                  <RecommendTitle>
                     <WomanIcon /> 여자 추천룩
                  </RecommendTitle>
                  {/* 이미지 랜덤으로 추천 */}
                  <StyleImage src={getStyleImage(Math.round(weather?.main.temp), 'female')[Math.floor(Math.random() * 3)]} alt="여성 패션" />
                  <div>현재 기온: {Math.round(weather?.main.temp)}°C</div>
                  <RecommendText $isDarkMode={isDarkMode}>{getClothingRecommendation(Math.round(weather?.main.temp), 'female')}</RecommendText>
               </RecommendBox>
            </StyleRecommendContainer>
         </Card>

         <Card $isDarkMode={isDarkMode} className="fivedays-weather">
            <Title3 $isDarkMode={isDarkMode}>5일 예보</Title3>
            <FiveDaysWeatherInfo>
               {fivedays && fivedays.length > 0 ? (
                  filterDailyForecasts(fivedays).map((day) => (
                     <ForecastItem key={day.dt} $isDarkMode={isDarkMode}>
                        <ForecastDetail>
                           <div style={{ minWidth: '100px' }}>
                              {new Date(day.dt * 1000).toLocaleDateString('ko-KR', {
                                 weekday: 'short',
                                 month: 'short',
                                 day: 'numeric',
                              })}
                           </div>
                           <WeatherIcon src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather icon" style={{ width: '50px', height: '50px' }} />
                           <div style={{ minWidth: '100px' }}>{day.weather[0].description}</div>
                        </ForecastDetail>

                        <ForecastDetail>
                           <WeatherDetail $isDarkMode={isDarkMode}>
                              <span className="label">기온</span>
                              <span className="value">{Math.round(day.main.temp)}°C</span>
                           </WeatherDetail>
                           <WeatherDetail $isDarkMode={isDarkMode}>
                              <span className="label">체감</span>
                              <span className="value">{Math.round(day.main.feels_like)}°C</span>
                           </WeatherDetail>
                           <WeatherDetail $isDarkMode={isDarkMode}>
                              <span className="label">습도</span>
                              <span className="value">{day.main.humidity}%</span>
                           </WeatherDetail>
                           <WeatherDetail $isDarkMode={isDarkMode}>
                              <span className="label">풍속</span>
                              <span className="value">{Math.round(day.wind.speed)}m/s</span>
                           </WeatherDetail>
                           <WeatherDetail $isDarkMode={isDarkMode}>
                              <span className="label">강수확률</span>
                              <span className="value">{Math.round((day.pop || 0) * 100)}%</span>
                           </WeatherDetail>
                        </ForecastDetail>
                     </ForecastItem>
                  ))
               ) : (
                  <div style={{ textAlign: 'center', padding: '20px' }}>날씨 데이터를 불러오는 중입니다...</div>
               )}
            </FiveDaysWeatherInfo>
         </Card>
      </WeatherContainer>
   )
}

export default FivedaysWeather
