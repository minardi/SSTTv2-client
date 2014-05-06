function createDatePicker() {
    var nowTemp = new Date(),
        now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0),
        start_date = $('.start-date').datepicker({
            onRender: function(date) {
                return date.valueOf() < now.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function(ev) {
            if (ev.date.valueOf() > end_date.date.valueOf()) {
                var newDate = new Date(ev.date);
                    newDate.setDate(newDate.getDate() + 1);
                    end_date.setValue(newDate);
            }
            start_date.hide();
            $('.end-date')[0].focus();
        }).data('datepicker');
            
        var end_date = $('.end-date').datepicker({
            onRender: function(date) {
                return date.valueOf() <= start_date.date.valueOf() ? 'disabled' : '';
            }
        }).on('changeDate', function(ev) {
        
        end_date.hide();
        
    }).data('datepicker');
}