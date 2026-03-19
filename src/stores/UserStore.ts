import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '../types';
import { userService } from '../services/userService';