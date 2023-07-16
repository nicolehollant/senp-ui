import { ref, onMounted } from "#imports";

export const useLoading = <T = any>(
  fn: (...params: any) => Promise<T>,
  options?: Partial<{
    defaultLoadingState: boolean;
    runOnMounted: boolean;
    onSuccess: (params?: T) => void;
    onError: (err?: any) => void;
  }>
) => {
  const loading = ref(options?.defaultLoadingState ?? false);

  const exec = async (...params: any) => {
    if (loading.value) {
      return;
    }
    loading.value = true;
    try {
      const result = await fn(params);
      loading.value = false;
      options?.onSuccess?.(result);
      return result;
    } catch (error) {
      loading.value = false;
      options?.onError?.(error);
    }
  };

  onMounted(() => {
    if (options?.runOnMounted) {
      exec();
    }
  });

  return {
    exec,
    loading,
  };
};
