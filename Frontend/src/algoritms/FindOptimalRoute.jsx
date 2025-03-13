import ymaps from "ymaps";
/**
* @param {Array} a - Координаты первой точки [lat, lon].
* @param {Array} b - Координаты второй точки [lat, lon].
* @returns {number} - Расстояние между точками.
*/

const getDistance = (a, b) => {
   return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
};

/**
* Генерация матрицы расстояний между всеми точками.
* @param {Array} places - Массив координат точек [[lat, lon], ...].
* @returns {Array} - Матрица расстояний.
*/
const generateDistanceMatrix = (places) => {
   const n = places.length;
   const matrix = Array.from({ length: n }, () => Array(n).fill(0));

   for (let i = 0; i < n; i++) {
       for (let j = 0; j < n; j++) {
           if (i !== j) {
               matrix[i][j] = getDistance(places[i], places[j]);
           }
       }
   }
   return matrix;
};

/**
* Муравьиный алгоритм для поиска оптимального маршрута.
* @param {Array} places - Массив координат мест [[lat, lon], ...].
* @param {number} ants - Количество муравьев.
* @param {number} iterations - Количество итераций.
* @param {number} alpha - Влияние феромонов.
* @param {number} beta - Влияние расстояния.
* @param {number} evaporation - Коэффициент испарения феромонов.
* @returns {Array} - Оптимальный маршрут.
*/
const antColonyOptimization = (places, ants = 10, iterations = 100, alpha = 1, beta = 2, evaporation = 0.5) => {
   const n = places.length;
   const distanceMatrix = generateDistanceMatrix(places);
   
   // Инициализация феромонов (начальное значение 1)
   let pheromones = Array.from({ length: n }, () => Array(n).fill(1));

   let bestRoute = [];
   let bestDistance = Infinity;

   for (let iter = 0; iter < iterations; iter++) {
       let allRoutes = [];
       let allDistances = [];

       for (let ant = 0; ant < ants; ant++) {
           let visited = new Set();
           let route = [0]; // Начинаем с первой точки
           visited.add(0);
           let current = 0;
           let distance = 0;

           while (route.length < n) {
               let probabilities = [];
               let sum = 0;

               // Рассчитываем вероятности перехода
               for (let j = 0; j < n; j++) {
                   if (!visited.has(j)) {
                       let pheromone = Math.pow(pheromones[current][j], alpha);
                       let visibility = Math.pow(1 / distanceMatrix[current][j], beta);
                       let probability = pheromone * visibility;
                       probabilities.push({ index: j, probability });
                       sum += probability;
                   }
               }

               // Выбираем следующую точку
               let r = Math.random() * sum;
               let cumulative = 0;
               let next = -1;
               for (let option of probabilities) {
                   cumulative += option.probability;
                   if (cumulative >= r) {
                       next = option.index;
                       break;
                   }
               }

               if (next !== -1) {
                   visited.add(next);
                   route.push(next);
                   distance += distanceMatrix[current][next];
                   current = next;
               }
           }

           distance += distanceMatrix[current][0]; // Возвращаемся в начальную точку
           route.push(0);
           allRoutes.push(route);
           allDistances.push(distance);

           if (distance < bestDistance) {
               bestDistance = distance;
               bestRoute = route;
           }
       }

       // Обновление феромонов
       for (let i = 0; i < n; i++) {
           for (let j = 0; j < n; j++) {
               pheromones[i][j] *= (1 - evaporation);
           }
       }

       for (let i = 0; i < allRoutes.length; i++) {
           let route = allRoutes[i];
           let routeDistance = allDistances[i];
           let pheromoneDeposit = 1 / routeDistance;

           for (let j = 0; j < route.length - 1; j++) {
               let from = route[j];
               let to = route[j + 1];
               pheromones[from][to] += pheromoneDeposit;
               pheromones[to][from] += pheromoneDeposit;
           }
       }
   }

   return bestRoute.map(index => places[index]);
};


