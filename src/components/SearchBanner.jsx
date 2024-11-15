import { atom, useRecoilState } from 'recoil'
import TextField from '@mui/material/TextField'
import { Button } from '@mui/material'
import { useState, useCallback, useEffect } from 'react'
import { useContext } from 'react'
import { ThemeContext } from '../components/ThemeContext'

export const searchValueState = atom({
   key: 'searchValueState',
   default: '',
})

function SearchBanner() {
   const [searchValue, setSearchValue] = useRecoilState(searchValueState)
   const [isSearchVisible, setIsSearchVisible] = useState(true)
   const [isSearchCompleted, setIsSearchCompleted] = useState(false) // 검색 완료 여부
   const [errorMessage, setErrorMessage] = useState('') // 입력하지 않았을 때 에러 메세지

   const { isDarkMode } = useContext(ThemeContext)

   // 로컬 스토리지에 저장된 검색어 불러오기
   useEffect(() => {
      // 페이지 새로고침 여부 확인
      const pageAccessedByReload = window.performance
         .getEntriesByType('navigation')
         .map((nav) => nav.type)
         .includes('reload')

      if (pageAccessedByReload) {
         // 새로고침인 경우 로컬 스토리지 값 삭제
         localStorage.removeItem('searchValue')
         setSearchValue('')
      } else {
         // 새로고침이 아닌 경우 (일반 네비게이션) 로컬 스토리지 값 불러오기, 다른 컴포넌트 이동 시 검색어 유지
         const storedValue = localStorage.getItem('searchValue')
         if (storedValue) {
            setSearchValue(storedValue)
         }
      }
   }, [setSearchValue])

   // 검색어 입력 처리
   const handleSearchInput = useCallback(
      (e) => {
         setSearchValue(e.target.value)
         setErrorMessage('') // 입력하지 않았을 때 에러 메세지 초기화
      },
      [setSearchValue]
   )

   // 검색 실행 및 검색창 숨기기
   const handleSearch = useCallback(() => {
      if (!searchValue) {
         setErrorMessage('검색어를 입력해주세요.')
         return
      }
      // 로컬 스토리지에 값 저장
      localStorage.setItem('searchValue', searchValue)

      // 검색어를 저장하고 검색창 숨기기
      setIsSearchVisible(false)
      setIsSearchCompleted(true) // 검색 완료 상태 업데이트
   }, [searchValue])

   // 재검색 처리 : 입력창을 보이게 하기, 검색어도 초기화
   const handleRetrySearch = useCallback(() => {
      setSearchValue('')
      setIsSearchVisible(true)
      setIsSearchCompleted(false)
      setErrorMessage('')
   }, [])

   // Enter 키 입력 처리
   const handleKeyPress = useCallback(
      (e) => {
         if (e.key === 'Enter') {
            handleSearch()
         }
      },
      [handleSearch]
   )

   return (
      <div style={{ marginTop: '50px', marginBottom: '20px' }}>
         {/* 검색창이 보일 때만 */}
         {isSearchVisible && (
            <div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <TextField
                     fullWidth
                     id="outlined-basic"
                     variant="outlined"
                     style={{ width: 500, backgroundColor: 'rgba(255, 255, 255, 0.3)', border: '1px solid #e0e0e0', borderRadius: '5px' }}
                     placeholder="원하시는 지역을 검색하세요" // 기본 텍스트 설정
                     onChange={handleSearchInput}
                     onKeyDown={handleKeyPress}
                     value={searchValue || ''} // searchValue가 없으면 빈 문자열로 설정
                  />
                  <Button
                     variant="contained"
                     style={{
                        minWidth: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        backgroundColor: isDarkMode ? '#4F378B' : '#7DFB8C',
                     }}
                     onClick={handleSearch}
                  >
                     &gt;
                  </Button>
               </div>
               {/* 오류 메시지 출력 */}
               {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
            </div>
         )}

         {/* 검색 완료 후 재검색 버튼 */}
         {isSearchCompleted && (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <h2>지역 검색어 저장이 완료 되었습니다!</h2>
               <Button variant="contained" style={{ backgroundColor: isDarkMode ? '#4F378B' : '#7DFB8C', marginTop: '10px', width: '100px', height: '40px', display: 'flex', justifyContent: 'center' }} onClick={handleRetrySearch}>
                  재검색
               </Button>
            </div>
         )}
      </div>
   )
}

export default SearchBanner
