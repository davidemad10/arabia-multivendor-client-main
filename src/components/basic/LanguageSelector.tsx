import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'



export default function LanguageSelector() {
  const { i18n } = useTranslation()
  const changeLng = (lng: string) => {
    i18n.changeLanguage(lng)
    location.reload()
  }
  useEffect(() => {
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])
  return (
    <button className='font-bold gap-1 text-blackText' onClick={() => changeLng(i18n.language == 'en' ? 'ar' : 'en')}>
      {i18n.language == 'en' ? 'العربية' : 'English'}
    </button>
  )
}
