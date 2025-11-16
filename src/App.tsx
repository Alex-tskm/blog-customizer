import { useState } from 'react';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import styles from './styles/index.module.scss';

export const App = () => {
	// Активные стили страницы (применяются к <main> и <Article>)
	const [activeStyles, setActiveStyles] =
		useState<ArticleStateType>(defaultArticleState);

	// Временные стили для панели настроек (не влияют на страницу до "Применить")
	const [tempStyles, setTempStyles] =
		useState<ArticleStateType>(defaultArticleState);

	// Обработчик изменения параметров в панели настроек
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
	};

	// Обработчик нажатия "Сбросить"
	const handleReset = () => {
		setTempStyles(defaultArticleState);
		setActiveStyles(defaultArticleState); // Применяем стили к странице
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': activeStyles.fontFamilyOption.value,
					'--font-size': activeStyles.fontSizeOption.value,
					'--font-color': activeStyles.fontColor.value,
					'--container-width': activeStyles.contentWidth.value,
					'--bg-color': activeStyles.backgroundColor.value,
				} as React.CSSProperties
			}>
			<ArticleParamsForm
				articleState={tempStyles}
				onChangeArticleState={handleTempStyleChange}
				onSubmit={handleSubmit}
				onReset={handleReset}
			/>
			<Article />
		</main>
	);
};
