import { atom, useRecoilState } from 'recoil'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchValue as setReduxSearchValue } from '../features/searchSlice'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search'
import { alpha } from '@mui/material/styles'

export const searchValueState = atom({
   key: 'searchValueState',
   default: '',
})

// 스타일드 컴포넌트 추가
const SearchContainer = styled.div`
   margin-top: 50px;
   margin-bottom: 20px;
   width: 100%;
   max-width: 600px;
   transition: all 0.3s ease;
`

const SearchWrapper = styled.div`
   display: flex;
   align-items: center;
   gap: 12px;
   width: 100%;
`

const StyledTextField = styled(TextField)`
   & .MuiOutlinedInput-root {
      transition: all 0.3s ease;
      border-radius: 12px;
      background-color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.05) : alpha('#000000', 0.03))};

      & fieldset {
         border-color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.1) : alpha('#000000', 0.1))};
      }

      &:hover fieldset {
         border-color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.2) : alpha('#000000', 0.2))};
      }

      &.Mui-focused fieldset {
         border-color: ${(props) => (props.$isDarkMode ? '#4F378B' : '#7DFB8C')};
      }
   }

   & .MuiInputBase-input {
      color: ${(props) => (props.$isDarkMode ? '#ffffff' : '#000000')};
      &::placeholder {
         color: ${(props) => (props.$isDarkMode ? alpha('#ffffff', 0.5) : alpha('#000000', 0.5))};
      }
   }
`

const SearchButton = styled(Button)`
   min-width: 50px !important;
   height: 50px !important;
   border-radius: 12px !important;
   background-color: ${(props) => (props.$isDarkMode ? '#4F378B' : '#7DFB8C')} !important;
   transition: all 0.3s ease !important;
   box-shadow: 0 4px 12px ${(props) => (props.$isDarkMode ? 'rgba(79, 55, 139, 0.2)' : 'rgba(125, 251, 140, 0.2)')} !important;

   &:hover {
      transform: translateY(-2px);
      background-color: ${(props) => (props.$isDarkMode ? '#5F479B' : '#8DFB9C')} !important;
      box-shadow: 0 6px 16px ${(props) => (props.$isDarkMode ? 'rgba(79, 55, 139, 0.3)' : 'rgba(125, 251, 140, 0.3)')} !important;
   }
`

const ErrorMessage = styled.p`
   color: #ff6b6b;
   margin-top: 10px;
   font-size: 0.9rem;
   animation: shake 0.5s ease-in-out;

   @keyframes shake {
      0%,
      100% {
         transform: translateX(0);
      }
      25% {
         transform: translateX(-5px);
      }
      75% {
         transform: translateX(5px);
      }
   }
`

const CompletionMessage = styled.div`
   text-align: center;
   margin-top: 30px;
   animation: fadeInUp 0.5s ease-out;

   @keyframes fadeInUp {
      from {
         opacity: 0;
         transform: translateY(20px);
      }
      to {
         opacity: 1;
         transform: translateY(0);
      }
   }

   h2 {
      margin-bottom: 20px;
      color: ${(props) => (props.$isDarkMode ? '#ffffff' : '#000000')};
   }
`

function SearchBanner() {
   // 검색 값 가져오기
   const [searchValue, setSearchValue] = useRecoilState(searchValueState)
   // 검색 상태 가져오기
   const [isSearchVisible, setIsSearchVisible] = useState(true)
   // 검색 완료 상태 가져오기
   const [isSearchCompleted, setIsSearchCompleted] = useState(false)
   // 에러 메시지 가져오기
   const [errorMessage, setErrorMessage] = useState('')
   // 테마 상태 가져오기
   const { isDarkMode } = useContext(ThemeContext)
   // 디스패치 함수 가져오기
   const dispatch = useDispatch()

   // 검색 값이 변경될 때마다 검색 값 저장
   const handleSearchInput = (e) => {
      setSearchValue(e.target.value)
      setErrorMessage('')
   }

   // 검색 버튼 클릭 시 검색 값 저장
   const handleSearch = useCallback(() => {
      if (!searchValue) {
         setErrorMessage('검색어를 입력해주세요.')
         return
      }

      dispatch(setReduxSearchValue(searchValue))
      setIsSearchVisible(false)
      setIsSearchCompleted(true)
   }, [searchValue, dispatch])

   // 재검색 시 모든 상태 초기화
   const handleRetrySearch = useCallback(() => {
      setIsSearchVisible(true)
      setIsSearchCompleted(false)
      setErrorMessage('') // 에러 메시지 초기화
      setSearchValue('') // Recoil 상태 초기화
      dispatch(setReduxSearchValue('')) // Redux 상태 초기화
   }, [dispatch, setSearchValue])

   // 엔터 키 누르면 검색 실행
   const handleKeyPress = useCallback(
      (e) => {
         if (e.key === 'Enter') {
            handleSearch()
         }
      },
      [handleSearch]
   )

   return (
      <SearchContainer>
         {isSearchVisible && (
            <div>
               <SearchWrapper>
                  <StyledTextField
                     fullWidth
                     variant="outlined"
                     placeholder="원하시는 지역을 검색하세요"
                     onChange={handleSearchInput}
                     onKeyDown={handleKeyPress}
                     value={searchValue || ''} // 빈 문자열 추가
                     $isDarkMode={isDarkMode}
                     sx={{
                        '& .MuiInputBase-input': { height: 20 },
                     }}
                  />
                  <SearchButton variant="contained" onClick={handleSearch} $isDarkMode={isDarkMode}>
                     <SearchIcon />
                  </SearchButton>
               </SearchWrapper>
               {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </div>
         )}

         {isSearchCompleted && (
            <CompletionMessage $isDarkMode={isDarkMode}>
               <h2>지역 검색어 저장이 완료되었습니다!</h2>
               <SearchButton variant="contained" onClick={handleRetrySearch} $isDarkMode={isDarkMode} style={{ width: 120, color: isDarkMode ? '#fff' : '#000' }}>
                  재검색
               </SearchButton>
            </CompletionMessage>
         )}
      </SearchContainer>
   )
}

export default SearchBanner
