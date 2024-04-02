document.addEventListener("DOMContentLoaded", function () {
  const empleados = [
    { nombre: "Victor Gisbert Olmos", dni: "48293145P" },
    { nombre: "Carol Alventosa Escorcia", dni: "20429510J" },
    { nombre: "Rafael Muñoz Llopis", dni: "20451814F" },
    { nombre: "Aaron Pla Lomas", dni: "20497576E" },
    { nombre: "Diyan Velev Talev", dni: "Y3957972P" },
  ];
  const datosEmpresa = {
    nombre:"Esteller Lloret S.L."
  }
  const userNameSelect = document.getElementById("userName");

  empleados.forEach((empleado) => {
    const option = document.createElement("option");
    // Convierte el objeto a una cadena JSON y asigna la cadena al atributo "value"
    option.value = JSON.stringify(empleado);
    option.textContent = `${empleado.nombre}`;
    userNameSelect.appendChild(option);
  });

  var datepickerInstance = flatpickr("#datePicker", {
    mode: "multiple",
    dateFormat: "d/m/Y",
  });

  document
    .getElementById("recuperarFechasButton")
    .addEventListener("click", function () {
      var fechasSeleccionadas = datepickerInstance.selectedDates.map((date) =>
        date.toLocaleDateString()
      );
      var nombreUsuario = document.getElementById("userName").value;
      const empleadoSeleccionado = JSON.parse(nombreUsuario);
      
      // Crear un objeto jsPDF
      var doc = new jsPDF("p", "pt");

      var company_logo = {
        w: 150,
        h: 50,
      };


      var customer_BillingInfoJSON = {
        CustomerName: "Jino Shaji",
        CustomerGSTIN: "37B76C238B7E1Z5",
        CustomerState: "KERALA (09)",
        CustomerPAN: "B76C238B7E",
        CustomerAddressLine1: "ABCDEFGD HOUSE,IX/642-D",
        CustomerAddressLine2: "ABCDEFGD P.O., NEDUMBASSERY",
        CustomerAddressLine3: "COCHIN",
        PIN: "683584",
        CustomerEmail: "abcd@gmail.com",
        CustomerPhno: "+918189457845",
      };

      var employeInfoJSON = {
        nombre: empleadoSeleccionado.nombre,
        dni: empleadoSeleccionado.dni,
      };

      var invoiceJSON = {
        InvoiceNo: "INV-120152",
        InvoiceDate: "03-12-2017",
        RefNo: "REF-78445",
        TotalAmnt: "Rs.1,24,200",
        SubTotalAmnt: "Rs.1,04,200",
        TotalGST: "Rs.2,0000",
        TotalCGST: "Rs.1,0000",
        TotalSGST: "Rs.1,0000",
        TotalIGST: "Rs.0",
        TotalCESS: "Rs.0",
      };
      var fontSizes = {
        HeadTitleFontSize: 18,
        Head2TitleFontSize: 16,
        TitleFontSize: 14,
        SubTitleFontSize: 12,
        NormalFontSize: 10,
        SmallFontSize: 8,
      };
      var lineSpacing = {
        NormalSpacing: 12,
      };

      var rightStartCol1 = 400;
      var rightStartCol2 = 480;
      var InitialstartX = 40;
      var startX = 40;
      var InitialstartY = 50;
      var startY = 0;
      var lineHeights = 12;
      doc.setFontSize(fontSizes.SubTitleFontSize);
      doc.setFont("helvetica");
      doc.setFontType("bold");
      var imgData =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAagAAABpCAYAAABvcbdlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2NjcwQTgyNDExMkZFNTExQjBBMkEwRTU5ODk5ODhENSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFQjhCQkUwQzJGOTIxMUU1OTU4RkI1N0MwRTQwQjYyNyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFQjhCQkUwQjJGOTIxMUU1OTU4RkI1N0MwRTQwQjYyNyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQjI3RThBOTAyRkU1MTFCRDUxRDdDNUZFQ0NCQ0JCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY2NzBBODI0MTEyRkU1MTFCMEEyQTBFNTk4OTk4OEQ1Ii8+IDwvcmRmOkRlc2NyaXB0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";
      doc.addImage(
        imgData,
        "JPEG",
        startX,
        (startY += 50),
        company_logo.w,
        company_logo.h
      );
     
     
      startY+=company_logo.h;
      doc.setFontType("normal");
      doc.setLineWidth(1);
      doc.line(
        20,
        startY + lineSpacing.NormalSpacing,
        220,
        startY + lineSpacing.NormalSpacing
      );
      doc.line(
        380,
        startY + lineSpacing.NormalSpacing,
        580,
        startY + lineSpacing.NormalSpacing
      );
      doc.setFontSize(fontSizes.Head2TitleFontSize);
      doc.setFontType("bold");
      doc.text("", startX, (startY += lineSpacing.NormalSpacing + 2), {
        align: "center",
      });
      doc.setFontSize(fontSizes.NormalFontSize);
      doc.setFontType("bold");

      //-------Customer Info Billing---------------------
      var startBilling = startY;

      doc.text(
        datosEmpresa.nombre,
        startX,
        (startY += 15),
        { align: "right" }
      );
      doc.setFontSize(fontSizes.NormalFontSize);
      doc.text("Direccion:", startX, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text("Polígono Industrial,", 100, startY);
      doc.setFontType("bold");
      doc.text("", startX, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text("c parcela 8, 46800, Valencia", 100, startY);
      doc.setFontType("bold");
      doc.text("CIF", startX, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text("B96830609", 100, startY);
      doc.setFontType("bold");
      doc.text("", startX, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text("", 80, startY);
      doc.setFontType("bold");
      doc.text("", startX, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text("", 80, startY);
      doc.setFontType("bold");
      doc.text("", startX, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text("", 80, startY);
      //-------Customer Info Shipping---------------------
      var rightcol1 = 380;
      var rightcol2 = 430;
      var auxStarY=startY;
      startY = startBilling;
      doc.setFontType("bold");
      doc.text(
        "Datos del empleado",
        rightcol1,
        (startY += lineSpacing.NormalSpacing)
      );
      doc.setFontSize(fontSizes.NormalFontSize);
      doc.setFontType("bold");
      doc.text("Nombre", rightcol1, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text(employeInfoJSON.nombre, rightcol2, startY);
      doc.setFontSize(fontSizes.NormalFontSize);
      doc.setFontType("bold");
      doc.text("DNI", rightcol1, (startY += lineSpacing.NormalSpacing));
      doc.setFontType("normal");
      doc.text(employeInfoJSON.dni, rightcol2, startY);
     
      startY =auxStarY;
      var header = function (data) {
        doc.setFontSize(8);
        doc.setTextColor(40);
        doc.setFontStyle("normal");
        // doc.textAlign("TAX INVOICE", {align: "center"}, data.settings.margin.left, 50);

        //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
        // doc.text("Testing Report", 110, 50);
      };
      doc.setFontSize(8);
      doc.setFontStyle("normal");
      var options = {
        beforePageContent: header,
        margin: {
          top: 50,
        },
        theme: "plain",
        styles: {
          overflow: "linebreak",
          fontSize: 8,
          rowHeight: "auto",
          columnWidth: "wrap",
        },
        columnStyles: {
          1: { columnWidth: "auto" },
          2: { columnWidth: "auto" },
          3: { columnWidth: "auto" },
          4: { columnWidth: "auto" },
          5: { columnWidth: "auto" },
          6: { columnWidth: "auto" },
        },
        startY: (startY += 50),
      };
      var nombre_usuario = empleadoSeleccionado.nombre;
      var columns = [
        { title: "", dataKey: "id", width: 90 },
        { title: "Dia", dataKey: "dia", width: 40 },
        { title: "Hora entrada", dataKey: "hora_entrada", width: 40 },
        { title: "Hora pausa", dataKey: "hora_pausa", width: 40 },
        { title: "Hora fin pausa", dataKey: "hora_fin_pausa", width: 40 },
        { title: "Hora salida 1", dataKey: "hora_salida_1", width: 40 },
        { title: "Hora vuelta 1", dataKey: "hora_vuelta_1", width: 40 },
        { title: "Hora salida final", dataKey: "hora_salida_final", width: 40 },
        { title: "Tiempo total", dataKey: "tiempoTotal", width: 40 },
      ];
      if(nombre_usuario.includes("Carol")||nombre_usuario.includes("Aaron")){
        columns = [
          { title: "", dataKey: "id", width: 90 },
          { title: "Dia", dataKey: "dia", width: 40 },
          { title: "Hora entrada", dataKey: "hora_entrada", width: 40 },
          { title: "Hora pausa", dataKey: "hora_pausa", width: 40 },
          { title: "Hora fin pausa", dataKey: "hora_fin_pausa", width: 40 },
          { title: "Hora salida 1", dataKey: "hora_salida_1", width: 40 },
          { title: "Tiempo total", dataKey: "tiempoTotal", width: 40 },
        ];
      }
     
   
      var rows = fechasSeleccionadas.map(function (fecha, index) {
        // Almacenar cada valor en una variable distinta
        var nombre_usuario = empleadoSeleccionado.nombre;
        var hora_formateada_entrada_invierno;
        var hora_formateada_pausa_comida;
        var hora_formateada_fin_pausa_comida;
        var hora_formateada_salida_curro1;
        var hora_formateada_vuelta_curro;
        var hora_formateada_salida_invierno;
        var tiempo_total_formateado;
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        if(nombre_usuario.includes("Carol")){
          let hora =7;
          let minuto = getRandomInt(25,45);
          hora_formateada_entrada_invierno = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = getRandomInt(9, 10);
          minuto = hora === 10 ? getRandomInt(0, 10) : getRandomInt(50, 59);
          hora_formateada_pausa_comida = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 10;
          minuto = getRandomInt(28, 45);
          hora_formateada_fin_pausa_comida = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = getRandomInt(13,14);
          minuto = hora === 14 ? getRandomInt(0, 15) : getRandomInt(50, 59);
          hora_formateada_salida_curro1 = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

            var tiempoEntradaPausa = calcularDiferenciaDeTiempo(
            hora_formateada_entrada_invierno,
            hora_formateada_pausa_comida
          );
          // var tiempoPausaFinPausa = calcularDiferenciaDeTiempo(registro.hora_pausa, registro.hora_fin_pausa);
          var tiempoFinPausaSalida1 = calcularDiferenciaDeTiempo(
            hora_formateada_fin_pausa_comida,
            hora_formateada_salida_curro1
          );
          var tiempoTotal =
          tiempoEntradaPausa + tiempoFinPausaSalida1;
          tiempo_total_formateado = `${(
            tiempoTotal /
            (1000 * 60 * 60)
          ).toFixed(2)} horas`;

        }else if(nombre_usuario.includes("Aaron")){
          let hora = getRandomInt(7, 8);
          let minuto = hora === 8 ? getRandomInt(0, 15) : getRandomInt(50, 59);
          hora_formateada_entrada_invierno = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = getRandomInt(9, 10);
          minuto = hora === 10 ? getRandomInt(0, 10) : getRandomInt(50, 59);
          hora_formateada_pausa_comida = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 10;
          minuto = getRandomInt(28, 45);
          hora_formateada_fin_pausa_comida = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 13;
          minuto = getRandomInt(28, 45);
          hora_formateada_salida_curro1 = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

            var tiempoEntradaPausa = calcularDiferenciaDeTiempo(
            hora_formateada_entrada_invierno,
            hora_formateada_pausa_comida
          );
          // var tiempoPausaFinPausa = calcularDiferenciaDeTiempo(registro.hora_pausa, registro.hora_fin_pausa);
          var tiempoFinPausaSalida1 = calcularDiferenciaDeTiempo(
            hora_formateada_fin_pausa_comida,
            hora_formateada_salida_curro1
          );
          var tiempoTotal =
          tiempoEntradaPausa + tiempoFinPausaSalida1;
          tiempo_total_formateado = `${(
            tiempoTotal /
            (1000 * 60 * 60)
          ).toFixed(2)} horas`;
        }else{
          let hora = getRandomInt(7, 8);
          let minuto = hora === 8 ? getRandomInt(0, 15) : getRandomInt(50, 59);
          hora_formateada_entrada_invierno = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = getRandomInt(9, 10);
          minuto = hora === 10 ? getRandomInt(0, 10) : getRandomInt(50, 59);
          hora_formateada_pausa_comida = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 10;
          minuto = getRandomInt(28, 45);
          hora_formateada_fin_pausa_comida = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 13;
          minuto = getRandomInt(28, 45);
          hora_formateada_salida_curro1 = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 15;
          minuto = getRandomInt(28, 45);
          hora_formateada_vuelta_curro = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          hora = 18;
          minuto = getRandomInt(28, 45);
          hora_formateada_salida_invierno = `${hora
            .toString()
            .padStart(2, "0")}:${minuto.toString().padStart(2, "0")}`;

          var tiempoEntradaPausa = calcularDiferenciaDeTiempo(
            hora_formateada_entrada_invierno,
            hora_formateada_pausa_comida
          );
          // var tiempoPausaFinPausa = calcularDiferenciaDeTiempo(registro.hora_pausa, registro.hora_fin_pausa);
          var tiempoFinPausaSalida1 = calcularDiferenciaDeTiempo(
            hora_formateada_fin_pausa_comida,
            hora_formateada_salida_curro1
          );
          // var tiempoSalida1Vuelta1 = calcularDiferenciaDeTiempo(registro.hora_salida_1, registro.hora_vuelta_1);
          var tiempoVuelta1SalidaFinal = calcularDiferenciaDeTiempo(
            hora_formateada_vuelta_curro,
            hora_formateada_salida_invierno
          );

          // Sumar los resultados
          var tiempoTotal =
            tiempoEntradaPausa + tiempoFinPausaSalida1 + tiempoVuelta1SalidaFinal;
          tiempo_total_formateado = `${(
            tiempoTotal /
            (1000 * 60 * 60)
          ).toFixed(2)} horas`;
      }
        return {
          id: "",
          dia: fecha,
          hora_entrada: hora_formateada_entrada_invierno,
          hora_pausa: hora_formateada_pausa_comida,
          hora_fin_pausa: hora_formateada_fin_pausa_comida,
          hora_salida_1: hora_formateada_salida_curro1,
          hora_vuelta_1: hora_formateada_vuelta_curro,
          hora_salida_final: hora_formateada_salida_invierno,
          tiempoTotal: tiempo_total_formateado,
        };
      });

      function calcularDiferenciaDeTiempo(horaInicio, horaFin) {
        var inicioMs = new Date(`2000-01-01T${horaInicio}`).getTime();
        var finMs = new Date(`2000-01-01T${horaFin}`).getTime();
        var diferenciaMs = finMs - inicioMs;

        // Limitar a dos decimales
        var diferenciaConDosDecimales = parseFloat(diferenciaMs.toFixed(2));

        return diferenciaConDosDecimales;
      }

      doc.autoTable(columns, rows, options);
      //-------Invoice Footer---------------------
      var rightcol1 = 340;
      var rightcol2 = 430;

      startY = doc.autoTableEndPosY() + 30;
      doc.setFontSize(fontSizes.NormalFontSize);

      doc.setFontType("bold");

      // Calcular la diferencia de tiempo entre cada par de horas y sumar los resultados
      var totalHoras = 0;
      rows.forEach(function (registro) {
        var nombre_usuario = empleadoSeleccionado.nombre;
        if(nombre_usuario.includes("Carol")||nombre_usuario.includes("Aaron")){

          var tiempoEntradaPausa = calcularDiferenciaDeTiempo(
            registro.hora_entrada,
            registro.hora_pausa
          );
          // var tiempoPausaFinPausa = calcularDiferenciaDeTiempo(registro.hora_pausa, registro.hora_fin_pausa);
          var tiempoFinPausaSalida1 = calcularDiferenciaDeTiempo(
            registro.hora_fin_pausa,
            registro.hora_salida_1
          );
          // Sumar los resultados
          var tiempoTotal =
            tiempoEntradaPausa + tiempoFinPausaSalida1 ;
          totalHoras += tiempoTotal;
        }else{          
          var tiempoEntradaPausa = calcularDiferenciaDeTiempo(
            registro.hora_entrada,
            registro.hora_pausa
          );
          // var tiempoPausaFinPausa = calcularDiferenciaDeTiempo(registro.hora_pausa, registro.hora_fin_pausa);
          var tiempoFinPausaSalida1 = calcularDiferenciaDeTiempo(
            registro.hora_fin_pausa,
            registro.hora_salida_1
          );
          // var tiempoSalida1Vuelta1 = calcularDiferenciaDeTiempo(registro.hora_salida_1, registro.hora_vuelta_1);
          var tiempoVuelta1SalidaFinal = calcularDiferenciaDeTiempo(
            registro.hora_vuelta_1,
            registro.hora_salida_final
          );

          // Sumar los resultados
          var tiempoTotal =
            tiempoEntradaPausa + tiempoFinPausaSalida1 + tiempoVuelta1SalidaFinal;
          totalHoras += tiempoTotal;
        }
      });

      doc.text(
        "Total Horas,",
        rightcol1,
        (startY += lineSpacing.NormalSpacing)
      );
      doc.text(
        `${(totalHoras / (1000 * 60 * 60)).toFixed(2)}`,
        rightcol2,
        startY
      );
      doc.setFontSize(fontSizes.NormalFontSize);
      var rightcol1 = 200;
      var rightcol2 = 450;
      startY+=50
      doc.setFontType("bold");
      doc.text(
        "Firma " + datosEmpresa.nombre + ",",
        rightcol1,
        (startY += lineSpacing.NormalSpacing + 25)
      );
      doc.text(
        "Firma "+ employeInfoJSON.nombre,
        rightcol2,
        startY
      );
      doc.setFontType("bold");
     
      doc.save(employeInfoJSON.nombre+"_Fichaje.pdf");
    });
});
