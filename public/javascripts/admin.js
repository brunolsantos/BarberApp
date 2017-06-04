$(document).ready(function(){
   $('#editBarber').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var id = button.data('id'); // Extract info from data-* attributes
        var name = button.data('name'); // Extract info from data-* attributes
        var photo = button.data('photo');// Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        modal.find('.modal-body #modalId').val(id);
        modal.find('.modal-body #modalName').val(name);
        modal.find('.modal-body #modalPhoto').val(photo);
    });
});