import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { useNewsStore } from '../../store/newsStore';
import { useAuthStore } from '../../store/authStore';
import { uploadImage } from '../../lib/uploadImage';

const NewsManagement: React.FC = () => {
  const { user } = useAuthStore();
  const { newsItems, isLoading, error, fetchNewsItems, createNewsItem, deleteNewsItem } = useNewsStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    link: '',
    image: null as File | null,
    imagePreview: null as string | null,
  });
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsItems();
  }, [fetchNewsItems]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('Image size must be less than 5MB');
        return;
      }
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
      setFormError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.title.trim() || !formData.excerpt.trim() || !formData.link.trim()) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (!formData.image) {
      setFormError('Please upload an image');
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload image
      const imageUrl = await uploadImage(formData.image);

      // Create news item
      await createNewsItem({
        title: formData.title.trim(),
        excerpt: formData.excerpt.trim(),
        link: formData.link.trim(),
        image_url: imageUrl,
        created_by: user?.id || '',
      });

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        link: '',
        image: null,
        imagePreview: null,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating news item:', err);
      setFormError((err as Error).message || 'Failed to create news item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) {
      return;
    }

    setIsDeleting(id);
    try {
      await deleteNewsItem(id);
    } catch (err) {
      console.error('Error deleting news item:', err);
      alert('Failed to delete news item. Please try again.');
    } finally {
      setIsDeleting(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: '',
      excerpt: '',
      link: '',
      image: null,
      imagePreview: null,
    });
    setFormError(null);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            News Items Management ({newsItems.length})
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-[#3B3D87] text-white rounded-md hover:bg-[#2d2f66] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add News Item
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {isLoading && newsItems.length === 0 ? (
          <div className="text-center py-8">
            <div className="animate-pulse text-gray-500">Loading news items...</div>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No news items yet. Click "Add News Item" to create one.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 bg-gray-100">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+Not+Found';
                    }}
                  />
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={isDeleting === item.id}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors disabled:opacity-50"
                    title="Delete"
                  >
                    {isDeleting === item.id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#3B3D87] hover:underline"
                  >
                    View Link →
                  </a>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add News Item Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Add News Item</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-red-800 text-sm">{formError}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B3D87]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt *
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B3D87]"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL *
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3B3D87]"
                    placeholder="https://example.com/article"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image *
                  </label>
                  <div className="mt-1 flex items-center gap-4">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isSubmitting}
                      />
                    </label>
                  </div>
                  {formData.imagePreview && (
                    <div className="mt-4 relative">
                      <img
                        src={formData.imagePreview}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: null, imagePreview: null })}
                        className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#3B3D87] text-white rounded-md hover:bg-[#2d2f66] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create News Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsManagement;

