
'use client'

/**
 * 这是一个空白主题，方便您用作创建新主题时的模板，从而开发出您自己喜欢的主题
 * 1. 禁用了代码质量检查功能，提高了代码的宽容度；您可以使用标准的html写法
 * 2. 内容大部分是在此文件中写死，notion数据从props参数中传进来
 * 3. 您可在此网站找到更多喜欢的组件 https://www.tailwind-kit.com/
 */
import NotionPage from '@/components/NotionPage'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Features from './components/Features'
import FeaturesBlocks from './components/FeaturesBlocks'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import { useRouter } from 'next/router'
import CONFIG from './config'
import Loading from '@/components/Loading'
import { isBrowser } from '@/lib/utils'
import { siteConfig } from '@/lib/config'

/**
 * 布局框架
 * 作为一个基础框架使用，定义了整个主题每个页面必备的顶部导航栏和页脚
 * 其它页面都嵌入到此框架中使用
 * @param {*} props
 * @returns
 */
const LayoutBase = (props) => {
  const { children } = props

  return <div id='theme-landing' className="overflow-hidden flex flex-col justify-between bg-white">

        {/* 顶部导航栏 */}
        <Header />

        {/* 内容 */}
        <div id='content-wrapper'>
            {children}
        </div>

        {/* 底部页脚 */}
        <Footer />
    </div>
}

/**
 * 首页布局
 * @param {*} props
 * @returns
 */
const LayoutIndex = (props) => {
  return (
        <>
            <Hero />
            <Features />
            <FeaturesBlocks />
            <Testimonials />
            <Newsletter />
        </>
  )
}

/**
 * 文章详情页布局
 * @param {*} props
 * @returns
 */
const LayoutSlug = (props) => {
  // 如果 是 /article/[slug] 的文章路径则进行重定向到另一个域名
  const router = useRouter()
  if (JSON.parse(siteConfig('LANDING_POST_REDIRECT_ENABLE', null, CONFIG)) && isBrowser && router.route === '/[prefix]/[slug]') {
    const redirectUrl = siteConfig('LANDING_POST_REDIRECT_URL', null, CONFIG) + router.asPath.replace('?theme=landing', '')
    router.push(redirectUrl)
    return <div id='theme-landing'><Loading /></div>
  }

  return <>
        <div id='container-inner' className='mx-auto max-w-screen-lg p-12'>
            <NotionPage {...props} />
        </div>
    </>
}

// 其他布局暂时留空
const LayoutSearch = (props) => <><Hero /></>
const LayoutArchive = (props) => <><Hero /></>
const Layout404 = (props) => <><Hero /></>
const LayoutCategoryIndex = (props) => <><Hero /></>
const LayoutPostList = (props) => <><Hero /></>
const LayoutTagIndex = (props) => <><Hero /></>

export {
  CONFIG as THEME_CONFIG,
  LayoutBase,
  LayoutIndex,
  LayoutSearch,
  LayoutArchive,
  LayoutSlug,
  Layout404,
  LayoutPostList,
  LayoutCategoryIndex,
  LayoutTagIndex
}
