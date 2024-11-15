import { useRecoilValue } from 'recoil'
import { searchValueState } from './SearchBanner'

function WeatherCard() {
   const searchValue = useRecoilValue(searchValueState)
   return <div>{searchValue}</div>
}

export default WeatherCard
