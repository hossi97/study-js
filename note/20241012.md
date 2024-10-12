# 20241012 학습 기록

## 목차

-   [NodeList](#NodeList)
-   [Event Bubbling](#Event-Bubbling)
-   [InnerHTML / InnerText / TextContent](#InnerHTML-/-InnerText-/-TextContent)
-   [Closure](#Closure)
-   [함수의 This 바인딩](#함수의-This-바인딩)
-   [Node / Element / HTMLElement](#Node-/-Element-/-HTMLElement)
-   [Data Attribute](#Data-Attribute)

## 내용

### NodeList

-   유사 배열 객체로 인덱스 접근과 반복이 가능하지만 배열과는 다름
-   querySelectorAll: 정적 NodeList 반환 -> 생성 시점의 DOM 요소 상태를 참조
-   getElementsByClassName: DOM의 변경에 따른 동적 NodeList 반환 -> 원본 DOM을 참조

```javascript
const example1: NodeList = () => {
	document.body.appendChild(document.createElement("h1"));
	document.body.appendChild(document.createElement("h1"));
	document.body.appendChild(document.createElement("h1"));

	const nodeList = document.querySelectorAll("h1");
	console.log(nodeList);

	// toArray1
	const nodes1 = Array.from(nodeList);
	console.log(nodes1);

	// toArray2
	const nodes2 = [...nodeList];
	console.log(nodes2);
};
```

<br>

### Event Bubbling

-   자식으로부터 최상위 부모까지의 이벤트를 연쇄적으로 호출함
-   stopPropagation()을 사용해 이를 버블링을 차단할 수 있음

```javascript
const example2: EventBubbling = () => {
	const parentElement = document.createElement("div");
	parentElement.textContent = "부모";
	parentElement.classList.add("parent");
	parentElement.addEventListener("click", (event) => {
		console.log("부모 클릭: ");
		console.log(event.target);
	});

	const childElement = document.createElement("div");
	childElement.textContent = "자식";
	childElement.classList.add("child");
	childElement.addEventListener("click", (event) => {
		console.log("자식 클릭:");
		const element = event.target as HTMLElement;
		console.log(element.matches(".child"));
	});

	const childOfChildElement = document.createElement("div");
	childOfChildElement.textContent = "자식의 자식";
	childOfChildElement.classList.add("child-of-child");
	childOfChildElement.addEventListener("click", (event) => {
		event.stopPropagation();
		console.log("자식의 자식 클릭:");
		console.log(event.target);
	});

	childElement.appendChild(childOfChildElement);
	parentElement.appendChild(childElement);
	document.body.appendChild(parentElement);
};
```

<br>

### InnerHTML / InnerText / TextContent

#### innerHTML

-   `text/html`으로 파싱한 결과
-   상대적으로 파싱이 느림
-   기존의 DOM 구조를 대체하므로 이벤트 및 메타데이터가 사라질 수 있음
-   HTML5 이전에는 `<script>` 태그를 통해 JS 코드 실행이 가능하여 XSS 공격에 취약했음
-   HTML5 라도 다양한 공격 루트에 여전히 취약함
    ```
    const name = "<img src='x' onerror='alert(1)'>";
    el.innerHTML = name; // shows the alert
    ```

#### innerText

-   렌더링된 결과를 바탕으로 식별자 노드의 내부 콘텐츠를 `text/plain` 으로 파싱한 결과
-   따라서 줄바꿈, 숨김 등이 반영됨
-   원시 텍스트(raw text)로 파싱이 빠름

#### textContent

-   식별자 노드의 내부 콘텐츠를 `text/plain` 으로 파싱한 결과
-   원시 텍스트(raw text)로 파싱이 빠름

<br>

### Closure

-   내부 함수에서 외부 함수의 변수를 참조할 수 있는 특성
-   변수 자체를 사용하면 최신 값을 참조하므로 함수 호출 시점의 변수 값을 사용하려면 별도로 값을 할당해서 사용해야 한다.

<br>

### 함수의 This 바인딩

#### 일반 함수

-   메소드 호출 시 메소드 내부의 this : 해당 메소드를 호출한 객체

```javascript
const cat = {
	name: "meow",
	foo1: function () {
		console.log(this.name);
	},
};
cat.foo1(); // meow
```

#### 화살표 함수

-   화살표 함수에는 this라는 변수 자체가 존재하지 않기 때문에 그 상위 환경에서의 this를 참조
-   화살표 함수를 생성자함수로 사용하면 에러

```javascript
const dog = {
	name: "mung",
	foo1: function () {
		const foo2 = () => {
			console.log(this.name);
		};
		foo2();
	},
};
dog.foo1(); // mung
```

#### 일반 함수의 내부 함수

-   함수 호출 시 함수 내부의 this : 지정되지 않음

```javascript
const dug = {
	name: "kkwak",
	foo1: function () {
		function foo2() {
			console.log(this.name);
		}
		foo2();
	},
};
dug.foo1(); // Error
```

#### addEventListener() 콜백함수에서의 this

```javascript
const event: Function = () => {
	const button1 = document.createElement("button");
	button1.textContent = "화살표 함수";
	button1.addEventListener("click", () => {
		console.log(this); // undefined
	});

	const button2 = document.createElement("button");
	button2.textContent = "일반 함수";
	button2.addEventListener("click", function () {
		console.log(this); // button 엘리먼트
	});
	document.body.appendChild(button1);
	document.body.appendChild(button2);
};
// event();
```

#### 전역 스코프에서의 this

-   Node 환경: this -> undefined
-   Browser 환경: this -> window

<br>

### Node / Element / HTMLElement

#### Node

-   DOM 트리 내의 모든 요소를 나타내는 가장 기본적인 인터페이스
-   모든 DOM 요소는 Node의 하위 클래스입니다. 즉, Element, Text, Document, Comment 등은 모두 Node를 상속받습니다.

#### Element

-   Node의 하위 클래스로 HTML, SVG, MathML과 같은 특정 마크업 언어의 요소를 나타냄

#### HTMLElement

-   Element의 하위 클래스로 HTML 요소에 특화된 객체

<br>

### Data Attribute

-   리스트 형태의 엘리먼트에서 값을 저장하고 취득하기 위한 방법으로 Data Attribute를 사용할 수 있음

#### using string manipulation

```javascript
const example3: NonDataAttribute = () => {
	let cardNum = 1;

	const cardList = document.createElement("ul");
	const createCard = () => {
		const card = document.createElement("li");
		const cardContent = document.createElement("p");
		cardContent.textContent = `Card #${cardNum}`;
		cardNum += 1;
		const cardButton = document.createElement("button");
		cardButton.textContent = `Card Number`;
		cardButton.addEventListener("click", () => {
			const cardNum = cardButton.parentElement?.children[0].textContent?.split(" ")[1].slice(1);
			console.log(`This Card Is Number ${cardNum}`);
		});
		card.appendChild(cardContent);
		card.appendChild(cardButton);

		return card;
	};

	const addCardBtn = document.createElement("button");
	addCardBtn.textContent = `Add Card`;
	addCardBtn.addEventListener("click", () => {
		cardList.appendChild(createCard());
	});

	document.body.appendChild(addCardBtn);
	document.body.appendChild(cardList);
};
example3();
```

#### using data attribute

```javascript
const example4: DataAttribute = () => {
	let cardNum = 1;

	const cardList = document.createElement("ul");
	const createCard = () => {
		const card = document.createElement("li");
		card.setAttribute("data-number", String(cardNum));
		const cardContent = document.createElement("p");
		cardContent.textContent = `Card #${cardNum}`;
		cardNum += 1;
		const cardButton = document.createElement("button");
		cardButton.textContent = `Card Number`;
		cardButton.addEventListener("click", () => {
			const cardNum = cardButton.parentElement?.getAttribute("data-number");
			console.log(`This Card Is Number ${cardNum}`);
		});
		card.appendChild(cardContent);
		card.appendChild(cardButton);

		return card;
	};

	const addCardBtn = document.createElement("button");
	addCardBtn.textContent = `Add Card`;
	addCardBtn.addEventListener("click", () => {
		cardList.appendChild(createCard());
	});

	document.body.appendChild(addCardBtn);
	document.body.appendChild(cardList);
};
example4();
```
