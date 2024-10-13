### Node 앱 실행 환경

#### `process.env.NODE_ENV`

-   @types/node 필요
-   process: 프로세스 정보
-   env: 실행 환경 정보
-   NODE_ENV
    -   production
    -   development
    -   test

### 로컬 JSON 파일 읽기

#### 1번

```typescript
const fs = require("fs");
return await fs.readFile("./products.json", "utf8", (error, data) => {
	if (error) {
		console.error("Error reading the json file: ", error);
		return;
	}
	try {
		return JSON.parse(data);
	} catch (parseError) {
		console.error("Error parsing JSON: ", parseError);
	}
});
```

#### 2번

```typescript
const fs = require("fs");
const path = "./data.json"; // 읽고 싶은 JSON 파일 경로

try {
	const data = fs.readFileSync(path, "utf8");
	const jsonData = JSON.parse(data);
	console.log("Parsed JSON data:", jsonData);
} catch (err) {
	console.error("Error reading or parsing the file:", err);
}
```

#### 3번 Vite

-   `.d.ts` (TypeScript Declaration File): TypeScript로 작성되지 않은 JavaScript 라이브러리나 파일에 대한 타입 정의를 제공하는 파일

```typescript
/* src/vite-env.d.ts */

declare module "*.json?raw" {
	const content: string;
	export default content;
}
```

```typescript
import test from "./test.json?raw";

JSON.parse(test);
```
