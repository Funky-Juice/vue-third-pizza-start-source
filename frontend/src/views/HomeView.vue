<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="(dough, index) in normalizedDoughTypes"
                :key="dough.id"
                class="dough__input"
                :class="`dough__input--${dough.type}`"
              >
                <input
                  type="radio"
                  name="dought"
                  class="visually-hidden"
                  :value="dough.type"
                  :checked="index === 0"
                />
                <b>{{ dough.name }}</b>
                <span>{{ dough.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="(size, index) in normalizedPizzaSizes"
                :key="size.id"
                class="diameter__input"
                :class="`diameter__input--${size.type}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="size.type"
                  class="visually-hidden"
                  :checked="index === 1"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="(sauce, index) in normalizedPizzaSauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="sauce.type"
                    :checked="index === 0"
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in normalizedPizzaIngredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span
                      class="filling"
                      :class="`filling--${ingredient.type}`"
                    >
                      {{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup>
import doughSizesEnum from "../common/enums/doughSizes";
import pizzaSizesEnum from "../common/enums/sizes.js";
import pizzaSaucesEnum from "../common/enums/sauces.js";
import pizzaIngredientsEnum from "../common/enums/ingredients.js";

import doughTypesData from "../mocks/dough.json";
import pizzaSizesData from "../mocks/sizes.json";
import saucesTypesData from "../mocks/sauces.json";
import pizzaIngredientsData from "../mocks/ingredients.json";

import { normalizeDataObj } from "../common/helpers.js";

const normalizedDoughTypes = doughTypesData.map((doughObj) =>
  normalizeDataObj(doughObj, doughSizesEnum),
);

const normalizedPizzaSizes = pizzaSizesData.map((sizeObj) =>
  normalizeDataObj(sizeObj, pizzaSizesEnum),
);

const normalizedPizzaSauces = saucesTypesData.map((sizeObj) =>
  normalizeDataObj(sizeObj, pizzaSaucesEnum),
);

const normalizedPizzaIngredients = pizzaIngredientsData.map((sizeObj) =>
  normalizeDataObj(sizeObj, pizzaIngredientsEnum),
);

console.log(normalizedDoughTypes);
console.log(normalizedPizzaSizes);
console.log(normalizedPizzaSauces);
console.log(normalizedPizzaIngredients);
</script>
