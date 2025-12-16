import { create } from 'zustand';
export type LayerMeta = {
    id: string;
    name?: string;
    type?: string;
    visible: boolean;
    locked: boolean;
}
type LayersState = {
    order: string[];
    byId: Record<string, LayerMeta>;

    syncFromCanvas: (layers: Array<Pick<LayerMeta, 'id' | 'name' | 'type'> & Partial<LayerMeta>>) => void;
    reorder: (activeId: string, overId: string) => void;

    toggleVisibility: (id: string) => void;
    toggleLock: (id: string) => void;

    removeMissing: (existingIds: string[]) => void;
}

function arrayMove<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const next = array.slice();
    const [movedItem] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, movedItem);
    return next;
}
export const useLayersStore = create<LayersState>((set, get) => ({
    order: [],
    byId: {},

    syncFromCanvas: (layers) => {
        set((state) => {
            const nextById: Record<string, LayerMeta> = {};
            const nextOrder: string[] = [];

            for (const l of layers) {
                if (!l.id) continue;

                const prev = state.byId[l.id];
                nextById[l.id] = {
                    id: l.id,
                    name: l.name ?? prev?.name,
                    type: l.type ?? prev?.type,
                    visible: l.visible ?? prev?.visible ?? true,
                    locked: l.locked ?? prev?.locked ?? false,
                };
                nextOrder.push(l.id);
            }

            return { byId: nextById, order: nextOrder };

        });
    },
    reorder: (activeId, overId) => {
        const { order } = get();
        const from = order.indexOf(activeId);
        const to = order.indexOf(overId);
        if (from === -1 || to === -1 || from === to) return;
        set({ order: arrayMove(order, from, to) });
    },

    toggleVisibility: (id) => {
        set((state) => ({
            byId: {
                ...state.byId,
                [id]: {
                    ...state.byId[id],
                    visible: !state.byId[id].visible,
                },
            },
        }));
    },

    toggleLock: (id) => {
        set((state) => ({
            byId: {
                ...state.byId,
                [id]: {
                    ...state.byId[id],
                    locked: !state.byId[id].locked,
                },
            },
        }));
    },

    removeMissing: (existingIds) => {
        set((state) => {
            const nextById = { ...state.byId };
            for (const id in nextById) {
                if (!existingIds.includes(id)) {
                    delete nextById[id];
                }
            }
            return {
                byId: nextById,
                order: state.order.filter((id) => existingIds.includes(id)),
            };
        });
    },
}));
