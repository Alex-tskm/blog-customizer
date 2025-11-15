import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Активные стили страницы (применяются к <main> и <Article>)
	const [activeStyles, setActiveStyles] =
		useState<ArticleStateType>(defaultArticleState);

	// Временные стили для панели настроек (не влияют на страницу до "Применить")
	const [tempStyles, setTempStyles] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчик изменения параметров В ПАнели настроек
	const handleTempStyleChange = (
		key: keyof ArticleStateType,
		option: {
			title: string;
			value: string;
			className: string;
			optionClassName?: string;
		}
	) => {
		setTempStyles((prev) => ({
			...prev,
			[key]: option,
		}));
	};

	// Обработчик нажатия "Применить"
	const handleSubmit = (data: { styles: ArticleStateType }) => {
		setActiveStyles(data.styles); // Применяем стили к странице
		//    console.log('Стили применены:', data.styles);
	};

	// Обработчик нажатия "Сбросить"
	const handleReset = () => {
		setTempStyles(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': activeStyles.fontFamilyOption.value,
					'--font-size': activeStyles.fontSizeOption.value,
					'--font-color': activeStyles.fontColor.value,
					'--container-width': activeStyles.contentWidth.value,
					'--bg-color': activeStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleState={tempStyles} // Передаем временные стили в панель
				onChangeArticleState={handleTempStyleChange}
				onSubmit={handleSubmit}
				onReset={handleReset} // Передаем обработчик сброса
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
