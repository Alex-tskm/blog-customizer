import { useState, useRef } from 'react';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	//defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onSubmit: (data: { styles: ArticleStateType }) => void;
	onReset?: () => void;
	onChangeArticleState: (
		key: keyof ArticleStateType,
		option: OptionType
	) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onSubmit,
	onReset,
	onChangeArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const panelRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: panelRef,
		onClose: () => {
			console.log('Панель закрыта по клику вне');
		},
		onChange: setIsOpen,
	});

	const togglePanel = () => {
		setIsOpen((prev) => !prev);
	};
	/*
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};
*/
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSubmit({
			styles: articleState,
		});
		setIsOpen(false);
		// Снимаем фокус с кнопки после отправки
		const submitButton = e.currentTarget.querySelector(
			'[type="submit"]'
		) as HTMLButtonElement;
		submitButton?.blur();
	};

	const handleReset = () => {
		if (onReset) {
			onReset();
		}
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={togglePanel} />
			<aside
				ref={panelRef}
				className={`
          ${styles.container}
          ${isOpen ? styles.container_open : ''}
        `}
				aria-hidden={!isOpen}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.formContent}>
						<Text as={'h2'} size={31} weight={800} uppercase>
							Задайте параметры
						</Text>

						<Select
							title='Шрифт'
							options={fontFamilyOptions}
							selected={articleState.fontFamilyOption}
							onChange={(option) =>
								onChangeArticleState('fontFamilyOption', option)
							}
						/>

						<RadioGroup
							title='Размер шрифта'
							name='font-size'
							options={fontSizeOptions}
							selected={articleState.fontSizeOption}
							onChange={(option) =>
								onChangeArticleState('fontSizeOption', option)
							}
						/>

						<Select
							title='Цвет текста'
							options={fontColors}
							selected={articleState.fontColor}
							onChange={(option) => onChangeArticleState('fontColor', option)}
						/>

						<Separator />

						<Select
							title='Цвет фона'
							options={backgroundColors}
							selected={articleState.backgroundColor}
							onChange={(option) =>
								onChangeArticleState('backgroundColor', option)
							}
						/>

						<Select
							title='Ширина контента'
							options={contentWidthArr}
							selected={articleState.contentWidth}
							onChange={(option) =>
								onChangeArticleState('contentWidth', option)
							}
						/>
					</div>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
